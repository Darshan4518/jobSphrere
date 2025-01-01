import { View, Text } from "react-native";

interface ChatBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
}

export function ChatBubble({ content, timestamp, isSent }: ChatBubbleProps) {
  return (
    <View className={`max-w-[80%] mb-4 ${isSent ? "self-end" : "self-start"}`}>
      <View
        className={`rounded-2xl p-3 ${isSent ? "bg-blue-500" : "bg-gray-100"}`}
      >
        <Text className={`text-sm ${isSent ? "text-white" : "text-gray-900"}`}>
          {content}
        </Text>
      </View>
      <Text className="text-xs text-gray-400 mt-1">{timestamp}</Text>
    </View>
  );
}
