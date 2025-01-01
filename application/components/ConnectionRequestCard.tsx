import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface ConnectionRequestCardProps {
  connection: {
    id: string;
    senderId: string;
    receiverId: string;
    status: string;
  };
  onAccept: () => void;
  onReject: () => void;
}

export const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({
  connection,
  onAccept,
  onReject,
}) => {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="font-semibold">User ID: {connection.senderId}</Text>
          <Text className="text-gray-500">Wants to connect with you</Text>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={onAccept}
          className="bg-blue-500 px-4 py-2 rounded-lg mr-2"
        >
          <Text className="text-white">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onReject}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          <Text>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
