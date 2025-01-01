import { Stack } from "expo-router";
import React from "react";

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="setup-profile" />
      <Stack.Screen name="education" />
      <Stack.Screen name="graduation" />
      <Stack.Screen name="employment" />
      <Stack.Screen name="add-project" />
    </Stack>
  );
};

export default OnboardingLayout;
