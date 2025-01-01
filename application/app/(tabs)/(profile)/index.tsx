import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

// Define types for menu items with stricter route typing
interface MenuItem {
  title: string;
  subtitle: string;
  route?:
    | "/account-details"
    | "/education"
    | "/help-support"
    | "/upgrade-premium";
}

const menuItems: MenuItem[] = [
  {
    title: "Account",
    subtitle: "Personal Info, Profile Picture",
    route: "/account-details",
  },
  {
    title: "Profile Set-up",
    subtitle: "Mention your job, experience, project work, and certification",
    route: "/education",
  },
  {
    title: "Help & Support",
    subtitle:
      "Customer Support / 24/7, Chat support, Customer call representative",
    route: "/help-support",
  },
  {
    title: "Upgrade to Premium",
    subtitle: "Choose our Premium plan to unlock better opportunities",
    route: "/upgrade-premium",
  },
];

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-xl flex-row justify-between items-center"
      onPress={() => router.push(item.route || "/setup-profile")}
    >
      <View className="flex-1">
        <Text className="font-medium mb-1">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-xl font-semibold mb-6">Profile</Text>
        <View className="space-y-4">
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            ListHeaderComponent={
              <View className="items-center mb-8">
                <Image
                  source={{ uri: "https://placeholder.com/150" }}
                  className="w-24 h-24 rounded-full mb-3"
                />
                <Text className="text-lg font-semibold mb-1">
                  {user?.user?.name || "Guest"}
                </Text>

                <View className="w-full bg-white rounded-xl p-4 mt-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-medium">Profile Completion</Text>
                    <ChevronRight size={20} color="#666" />
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View className="h-full w-[75%] bg-blue-500" />
                  </View>
                  <Text className="text-sm text-gray-500 mt-2">
                    3 Details Remaining
                  </Text>
                  <Text className="text-xs text-gray-400">
                    Updated 2 days ago
                  </Text>
                </View>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
