import { useSocket } from "@/hooks/useSocket";
import { Stack } from "expo-router";
import React from "react";

const MessageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
};

export default MessageLayout;
