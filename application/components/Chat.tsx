import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
const Chat = () => {
  const { id: receiverId } = useLocalSearchParams<{ id: string }>();
  const [messageInput, setMessageInput] = useState("");
  const user = useAuthStore((state) => state.user?.user);
  const { messages, sendMessage, getMessages } = useChatStore();

  useEffect(() => {
    if (user && receiverId) {
      getMessages(user.id, receiverId);
    }
  }, [user, receiverId, getMessages]);

  const handleSendMessage = () => {
    if (user && messageInput.trim() && receiverId) {
      sendMessage(receiverId, messageInput.trim());
      setMessageInput("");
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View
      className={`${
        item.senderId === user?.id
          ? "self-end bg-blue-500 text-white"
          : "self-start bg-gray-200 text-black"
      } p-3 m-2 rounded-lg`}
    >
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
      />
      <View className="flex-row items-center p-3 border-t border-gray-300">
        <TextInput
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="ml-3 bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
