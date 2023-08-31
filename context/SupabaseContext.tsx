import { createContext } from "react";
import { EmailOtpType,MobileOtpType } from "@supabase/supabase-js";

type SupabaseContextProps = {
	isLoggedIn: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	verifyOtp: (
		email: string,
		token: string,
		type:EmailOtpType,
	) => Promise<void>;
	verifyMobileOtp: (
		phone: string,
		token: string,
		type:MobileOtpType,
	) => Promise<void>;
	signInWithPassword: (email: string, password: string) => Promise<void>;
	resetPasswordForEmail: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
	signInWithPhone: (phone: string) => Promise<void>; // Add this line
};

export const SupabaseContext = createContext<SupabaseContextProps>({
	isLoggedIn: false,
	signUp: async () => {},
	verifyMobileOtp:async ()=>{},
	verifyOtp: async () => {},
	signInWithPassword: async () => {},
	resetPasswordForEmail: async () => {},
	signOut: async () => {},
	signInWithPhone: async () => {}, // Add this line
});