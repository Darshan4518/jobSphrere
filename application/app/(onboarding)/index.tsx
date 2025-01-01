import { View, Text, Image, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-2xl font-bold mb-4">Setup Your Profile</Text>
        <Text className="text-gray-600 text-center mb-8">
          Define who you are! Setup your profile to get the best experience
        </Text>
        <Image
          source={require("../../assets/images/onboardingImage1.png")}
          style={{
            width: width * 0.8,
            height: height * 0.4,
            marginBottom: height * 0.2,
          }}
        />
        <Link href="/setup-profile">
          <View className="bg-blue-500 rounded-full w-full py-4">
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </View>
        </Link>
        <Link href="/setup-profile" asChild>
          <Text className="text-gray-500 mt-4">Skip For Now</Text>
        </Link>
      </View>
    </View>
  );
}
