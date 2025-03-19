import { useAuthStore } from "@/store/useAuthStore";
import { useConnectionStore } from "@/store/useConnectionStore";
import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function FollowButton({ receiverId }: { receiverId: string }) {
  const { user } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(false);
  const { sendConnectionRequest } = useConnectionStore();

  const handleSendRequest = () => {
    if (user?.user?.id && receiverId) {
      sendConnectionRequest(receiverId);
      setIsFollowing(!isFollowing);
    }
  };
  return (
    <View>
      <TouchableOpacity
        className={`py-2 px-4 rounded-full shadow-md ${
          isFollowing ? "bg-green-500" : "bg-blue-500"
        }`}
        onPress={handleSendRequest}
      >
        <Text className="text-white text-lg font-bold">
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
