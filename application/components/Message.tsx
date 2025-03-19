import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useChatStore } from "@/store/useChatStore";
import { MessagePreviewCard } from "./MessagePreviewCard(";

const Messages = () => {
  const router = useRouter();
  const { messages } = useChatStore();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-12">
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessagePreviewCard
              platform="JobSphere"
              content={item?.content}
              timestamp={new Date(item?.timestamp).toDateString()}
              onPress={() => router.push(`/chat/${item?._id}`)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Messages;
