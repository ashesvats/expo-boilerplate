import "react-native-url-polyfill/auto";
import React from "react";

import { EmailOtpType, MobileOtpType, createClient } from "@supabase/supabase-js";
import SecureStore from '@react-native-async-storage/async-storage';

import { useSegments, useRouter } from "expo-router";

import { SupabaseContext } from "./SupabaseContext";
import { supabaseUrl, supabaseKey } from "./supabase";

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItem(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItem(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.removeItem(key);
	},
};

// This hook will protect the route access based on user authentication.
function useProtectedRoute(isLoggedIn: boolean) {
	const segments = useSegments();
	const router = useRouter();

	React.useEffect(() => {
		try {
			const inAuthGroup = segments[0] === "(auth)";

		if (
			// If the user is not logged in and the initial segment is not anything in the auth group.
			!isLoggedIn &&
			!inAuthGroup
		) {
			// Redirect to the login page.
			router.replace("/login");
		} else if (isLoggedIn && inAuthGroup) {
			// Redirect away from the sign-up page.
			router.replace("/home");
		}
		} catch (error) {
			console.error("error in 1",error);
		}
	}, [isLoggedIn, segments]);
}

type SupabaseProviderProps = {
	children: JSX.Element | JSX.Element[];
};

export const SupabaseProvider = (props: SupabaseProviderProps) => {
	const [isLoggedIn, setLoggedIn] = React.useState<boolean>(true);

	const supabase = createClient(supabaseUrl, supabaseKey, {
		auth: {
			storage: ExpoSecureStoreAdapter,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	});

	const signUp = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) throw error;
	};

	const verifyOtp = async (
		email: string,
		token: string,
		type: EmailOtpType,
	) => {
		const { error } = await supabase.auth.verifyOtp({
			email,
			token,
			type,
		});
		if (error) throw error;
		setLoggedIn(true);
	};
	const verifyMobileOtp = async (
		phone: string,
		token: string,
		type: MobileOtpType,
	) => {
		const { error,data } = await supabase.auth.verifyOtp({
			phone,
			token,
			type,
		});
		setLoggedIn(true);
		if (error) throw error;
		setLoggedIn(true);
	};

	const signInWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw error;
		setLoggedIn(true);
	};

	const resetPasswordForEmail = async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email);
		if (error) throw error;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		setLoggedIn(false);
	};

	const signInWithPhone = async (phone: string) => {
		const { error } = await supabase.auth.signInWithOtp({
			phone,
		});
		if (error) throw error;
		
	};

	const getSession = async () => {
		const result = await supabase.auth.getSession();
		setLoggedIn(result.data.session !== null);
	};

	React.useEffect(() => {
		getSession();
		console.log("isLoggedIn", isLoggedIn);
	}, [isLoggedIn]);

	useProtectedRoute(isLoggedIn);

	return (
		<SupabaseContext.Provider
			value={{
				isLoggedIn,
				signInWithPassword,
				signInWithPhone,
				verifyOtp,
				verifyMobileOtp,
				signUp,
				resetPasswordForEmail,
				signOut,
			}}
		>
			{props.children}
		</SupabaseContext.Provider>
	);
};
