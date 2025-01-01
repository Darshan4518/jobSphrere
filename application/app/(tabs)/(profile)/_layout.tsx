import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileScreens = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="account-details" />
    </Stack>
  );
};

export default ProfileScreens;
