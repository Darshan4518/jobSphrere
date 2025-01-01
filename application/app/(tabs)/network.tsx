import { useAuthStore } from "@/store/useAuthStore";
import { useConnectionStore } from "@/store/useConnectionStore";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

export default function ConnectionsScreen() {
  const user = useAuthStore((state) => state.user?.user);
  const { connections, getPendingConnections, updateConnectionStatus } =
    useConnectionStore();

  useEffect(() => {
    if (user) {
      getPendingConnections();
    }
  }, [user, getPendingConnections]);

  const handleConnectionResponse = (
    connectionId: string,
    status: "accepted" | "rejected"
  ) => {
    updateConnectionStatus(connectionId, status);
  };

  const renderConnectionItem = ({ item }: { item: any }) => (
    <View className="mb-5">
      <Text>{item.senderId.name} wants to connect</Text>
      <View className="flex-row mt-2">
        <TouchableOpacity
          onPress={() => handleConnectionResponse(item._id, "accepted")}
          className="bg-green-500 px-4 py-2 mr-2 rounded"
        >
          <Text className="text-white">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleConnectionResponse(item._id, "rejected")}
          className="bg-red-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Pending Connections</Text>
      <FlatList
        data={connections}
        renderItem={renderConnectionItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
