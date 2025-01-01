import { Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/(home)");
    }
  }, [user, segments]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(onboarding)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
