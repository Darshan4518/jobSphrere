import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="company/[id]" />
    </Stack>
  );
};

export default HomeLayout;
