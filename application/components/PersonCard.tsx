import { View, Text, TouchableOpacity, Image } from "react-native";
import { MapPin } from "lucide-react-native";

interface PersonCardProps {
  name: string;
  avatar: string;
  role: string;
  location: string;
  followers: number;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

export function PersonCard({
  name,
  avatar,
  role,
  location,
  followers,
  isFollowing,
  onToggleFollow,
}: PersonCardProps) {
  return (
    <View className="bg-white p-4 rounded-xl mb-4">
      <View className="flex-row items-start">
        <Image
          source={{ uri: avatar }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-gray-500 text-sm mb-2">{role}</Text>
          <View className="flex-row items-center mb-2">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <Text className="text-gray-600 text-sm">{location}</Text>
          </View>
          <Text className="text-gray-500 text-sm">{followers} followers</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onToggleFollow}
        className={`mt-3 py-2 rounded-full ${
          isFollowing ? "bg-gray-100" : "bg-blue-500"
        }`}
      >
        <Text
          className={`text-center ${
            isFollowing ? "text-gray-600" : "text-white"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
