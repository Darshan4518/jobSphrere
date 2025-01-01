import { View, Text, TouchableOpacity, Image } from "react-native";
import { MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  type: string;
  location: string;
  followers: number;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

export function CompanyCard({
  id,
  name,
  logo,
  type,
  location,
  followers,
  isFollowing,
  onToggleFollow,
}: CompanyCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/company/${id}`)}
      className="bg-white p-4 rounded-xl mb-4"
    >
      <View className="flex-row items-start">
        <Image source={{ uri: logo }} className="w-12 h-12 rounded-xl mr-3" />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-gray-500 text-sm mb-2">{type}</Text>
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
    </TouchableOpacity>
  );
}
