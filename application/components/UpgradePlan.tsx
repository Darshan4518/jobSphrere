import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
const UpgradePlan = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="ml-4 text-lg font-semibold">Upgrade to Premium</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4">Why Go Premium?</Text>
        <Text className="text-base text-gray-600 mb-6">
          Unlock exclusive features and get the most out of your experience.
          With our Premium plan, you can enjoy:
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          - Ad-free experience
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          - Priority customer support
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          - Access to premium content
        </Text>

        <Text className="text-lg font-semibold mb-4">Subscription Plans</Text>
        <Text className="text-base text-gray-600 mb-2">1 Month: 399 INR </Text>
        <Text className="text-base text-gray-600 mb-2">
          6 Months: 2100 INR{" "}
        </Text>
        <Text className="text-base text-gray-600 mb-6">1 Year: 4000 INR </Text>

        <TouchableOpacity className="bg-blue-500 p-4 rounded-xl">
          <Text className="text-center text-white text-base font-semibold">
            Upgrade Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default UpgradePlan;
