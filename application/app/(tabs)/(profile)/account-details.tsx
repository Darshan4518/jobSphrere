import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, CheckCircle } from "lucide-react-native";
import { Profile, useProfileStore } from "@/store/useProfileStore";
import { useCallback, useState } from "react";
import Button from "@/components/Button";

export default function AccountDetails() {
  const router = useRouter();
  const { profile, updateProfile, loading } = useProfileStore();
  const [profileUpdate, setProfileUpdate] = useState<Profile | null>(profile);

  const handleChange = (key: keyof Profile, value: string) => {
    setProfileUpdate((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(() => {
    if (profileUpdate) {
      updateProfile(profileUpdate.id!, profileUpdate);
    }
  }, [profileUpdate, updateProfile]);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="ml-4 text-lg font-semibold">Account Details</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: "https://placeholder.com/150" }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
              <CheckCircle size={24} color="#007AFF" />
            </View>
          </View>
          <Text className="text-lg font-semibold mt-3">
            {profileUpdate?.name || "Your Name"}
          </Text>
          <Text className="text-gray-500">
            {profileUpdate?.email || "Your Email"}
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4">Personal Info</Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Full Name</Text>
              <TextInput
                value={profileUpdate?.name || ""}
                onChangeText={(text) => handleChange("name", text)}
                className="text-base"
                placeholder="Enter your full name"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Email address</Text>
              <TextInput
                keyboardType="email-address"
                value={profileUpdate?.email || ""}
                onChangeText={(text) => handleChange("email", text)}
                className="text-base"
                placeholder="Enter your email"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Mobile Number</Text>
              <TextInput
                keyboardType="phone-pad"
                value={profileUpdate?.mobile || ""}
                onChangeText={(text) => handleChange("mobile", text)}
                className="text-base"
                placeholder="Enter your mobile number"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Age</Text>
              <TextInput
                value={profileUpdate?.age || ""}
                onChangeText={(text) => handleChange("age", text)}
                className="text-base"
                placeholder="Enter your age"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Gender</Text>
              <TextInput
                value={profileUpdate?.gender || ""}
                onChangeText={(text) => handleChange("gender", text)}
                className="text-base"
                placeholder="Enter your gender"
              />
            </View>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4">Address</Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">Pincode</Text>
              <TextInput
                keyboardType="numeric"
                value={profileUpdate?.pincode || ""}
                onChangeText={(text) => handleChange("pincode", text)}
                className="text-base"
                placeholder="Enter pincode"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-sm text-gray-500 mb-1">
                Landmark, Locality, Place
              </Text>
              <TextInput
                value={profileUpdate?.landmark || ""}
                onChangeText={(text) => handleChange("landmark", text)}
                className="text-base"
                placeholder="Enter landmark details"
              />
            </View>
          </View>
        </View>

        <Button
          title="Save"
          onPress={handleSubmit}
          loading={loading}
          className="mb-10"
        />
      </ScrollView>
    </View>
  );
}
