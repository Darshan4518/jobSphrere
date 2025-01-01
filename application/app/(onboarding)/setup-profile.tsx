import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  MapPin,
  Landmark,
  Home,
} from "lucide-react-native";
import { useProfileStore } from "../../store/useProfileStore";
import { useAuthStore } from "../../store/useAuthStore";
import { FormInput } from "@/components/FormInput";
import { ProgressHeader } from "@/components/ProgressHeader";
import Button from "@/components/Button";

export default function SetupProfile() {
  const router = useRouter();
  const { createProfile, loading, error, profile } = useProfileStore();
  const { user } = useAuthStore();

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.user?.name || "",
    mobile: profile?.mobile || "",
    email: user?.user?.email || "",
    age: profile?.age || "",
    gender: profile?.gender || "",
    pincode: profile?.pincode || "",
    landmark: profile?.landmark || "",
    address: profile?.address || "",
  });

  const handleSubmit = async () => {
    if (!user?.user?.id) {
      Alert.alert("Error", "User not found");
      return;
    }
    await createProfile(personalInfo);
    if (!error) {
      router.push("/education");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ProgressHeader title="Setup Your Profile" step={1} totalSteps={5} />
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-lg font-semibold mb-4">Personal Info</Text>
          <FormInput
            icon={User}
            placeholder="Name"
            value={personalInfo.name}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, name: text })
            }
          />

          <FormInput
            icon={Phone}
            placeholder="Mobile Number"
            value={personalInfo.mobile}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, mobile: text })
            }
            keyboardType="phone-pad"
          />

          <FormInput
            icon={Mail}
            placeholder="Email Address"
            value={personalInfo.email}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, email: text })
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormInput
                icon={Calendar}
                placeholder="Age"
                value={personalInfo.age}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, age: text })
                }
                keyboardType="number-pad"
              />
            </View>

            <View className="flex-1">
              <FormInput
                icon={Users}
                placeholder="Gender"
                value={personalInfo.gender}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, gender: text })
                }
              />
            </View>
          </View>

          <Text className="text-lg font-semibold mb-4 mt-6">Address</Text>

          <FormInput
            icon={MapPin}
            placeholder="Pincode"
            value={personalInfo.pincode}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, pincode: text })
            }
            keyboardType="number-pad"
          />

          <FormInput
            icon={Landmark}
            placeholder="Landmark, Locality, Place"
            value={personalInfo.landmark}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, landmark: text })
            }
          />

          <FormInput
            icon={Home}
            placeholder="Flat no, Street name, Area"
            value={personalInfo.address}
            onChangeText={(text) =>
              setPersonalInfo({ ...personalInfo, address: text })
            }
          />
        </View>
      </ScrollView>

      <View className="p-4">
        <Button
          title="Save & Continue"
          onPress={handleSubmit}
          className="w-full"
          loading={loading}
        />

        <TouchableOpacity
          className="w-full mt-2"
          onPress={() => router.push("/education")}
        >
          <Text className=" text-center">Skip For Now</Text>
        </TouchableOpacity>
      </View>

      {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
    </View>
  );
}
