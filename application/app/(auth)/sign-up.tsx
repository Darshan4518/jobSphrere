import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";
import { Eye, EyeOff, Mail, User } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loading, error } = useAuthStore();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    await signUp({ name, email, password });
    if (!error) {
      router.replace("/(onboarding)");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-12">
        <View className="max-w-md w-full mx-auto">
          <Text className="text-3xl font-bold mb-6 text-center">Sign Up</Text>

          <View className="space-y-4">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 my-3">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                className="flex-1 text-base"
              />
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 ">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-base"
              />
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 my-3">
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 text-base ml-2"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            disabled={loading}
            className={`mt-6 bg-blue-500 py-3 rounded-full ${
              loading ? "opacity-50" : ""
            }`}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text className="mt-4 text-red-500 text-center">{error}</Text>
          )}

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" className="text-blue-500 font-semibold">
              Sign In
            </Link>
          </View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
            }}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
