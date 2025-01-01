import { View, Text, TouchableOpacity, Image } from "react-native";

interface MessagePreviewCardProps {
  platform: string;
  icon?: string;
  content: string;
  timestamp: string;
  onPress: () => void;
}

export function MessagePreviewCard({
  platform,
  icon,
  content,
  timestamp,
  onPress,
}: MessagePreviewCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 border-b border-gray-100"
    >
      <Image source={{ uri: icon }} className="w-10 h-10 rounded-full mr-3" />
      <View className="flex-1">
        <Text className="font-semibold mb-1">{platform}</Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {content}
        </Text>
      </View>
      <Text className="text-gray-400 text-sm">{timestamp}</Text>
    </TouchableOpacity>
  );
}
