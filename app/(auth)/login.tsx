import React, { useRef, useState } from "react";
import { Text, View } from "react-native";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";

import tw from "@/lib/tailwind";
import { useSupabase } from "@/context/useSupabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { Error } from "@/types/error";

const FormSchema = z.object({
  phone: z.string().min(10, "Mobile number should be 10 digit"),
});

export default function Login() {
  const { signInWithPhone } = useSupabase();
  const router = useRouter();
  const alertRef = useRef<any>(null);
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const a = await signInWithPhone(data.phone);
      router.push({
        pathname: "/verify",
        params: { phone: data.phone },
      });
    } catch (error: Error | any) {
      console.error(error.message);
      alertRef.current?.showAlert({
        variant: "destructive",
        title: "Error",
        message: error.message,
      });
    }
  }

  return (
    <SafeAreaView
      style={tw`flex-1 items-center bg-background dark:bg-dark-background p-4`}
    >
      <Alert ref={alertRef} />
      <Text
        style={tw`h1 text-foreground dark:text-dark-foreground self-start mb-5`}
      >
        Login
      </Text>
      <View style={tw`w-full gap-y-4`}>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <PhoneInput
              value={value}
              defaultCode="IN"
              containerStyle={{
                width: "100%",
              }}
              layout="first"
              onChangeFormattedText={(text) => {
                onChange(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          )}
        />
      </View>
      <View style={tw`w-full gap-y-4 absolute bottom-[50px]`}>
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
        <Text
          style={tw`muted text-center`}
          onPress={() => {
            router.back();
          }}
        >
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
}
