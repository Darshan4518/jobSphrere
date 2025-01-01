import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function HelpSupport() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="ml-4 text-lg font-semibold">Help & Support</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4">Customer Support</Text>
        <Text className="text-base text-gray-600 mb-6">
          If you have any issues, feel free to reach out to us anytime. Our
          dedicated support team is available 24/7.
        </Text>
        <Text className="text-lg font-semibold mb-4">Contact Information</Text>
        <Text className="text-base text-gray-600">
          Email: codewithdarshan45@gamil.com
        </Text>
        <Text className="text-base text-gray-600 mb-6">
          Phone: +91 636205XXXX
        </Text>
        <Text className="text-lg font-semibold mb-4">FAQs</Text>
        <Text className="text-base text-gray-600 mb-2">
          1. How do I reset my password?
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          2. How can I update my account details?
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          3. Where can I view my subscription details?
        </Text>
      </ScrollView>
    </View>
  );
}
