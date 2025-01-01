import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useChatStore } from "@/store/useChatStore";
import { MessagePreviewCard } from "@/components/MessagePreviewCard(";

export default function Messages() {
  const router = useRouter();
  const { messages } = useChatStore();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-12">
        <ScrollView>
          {messages.map((message) => (
            <MessagePreviewCard
              key={message.id}
              platform="JobSphere"
              content={message?.content}
              timestamp={message?.timestamp.toDateString()}
              onPress={() => router.push(`/chat/${message.id}`)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
