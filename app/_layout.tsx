import { Slot } from "expo-router";
import { useDeviceContext } from "twrnc";
import tw from "@/lib/tailwind";
import { SupabaseProvider } from "@/context/SupabaseProvider";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
export default function Root() {
  useDeviceContext(tw);
  return (
    <SupabaseProvider>
      <Slot></Slot>
    </SupabaseProvider>
  );
}
