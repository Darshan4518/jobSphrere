import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { Input } from "@/components/Input";

const CreatePost = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Post content is required");
      return;
    }

    try {
      const postData = {
        content,
        qualifications,
        company,
        image,
      };

      Alert.alert("Success", "Post created successfully");
      router.back();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1 p-4">
        <View>
          <Text className="text-2xl font-bold mb-6 text-center text-blue-600">
            Create New Post
          </Text>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Post Content
            </Text>
            <Input
              placeholder="What's on your mind?"
              value={content}
              onChangeText={setContent}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Qualifications
            </Text>
            <Input
              placeholder="Qualifications (optional)"
              value={qualifications}
              onChangeText={setQualifications}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Company
            </Text>
            <Input
              placeholder="Company (optional)"
              value={company}
              onChangeText={setCompany}
            />
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-gray-100 p-4 rounded-md mb-6"
            onPress={handleImagePick}
          >
            <Feather name="image" size={24} color="#007AFF" />
            <Text className="ml-3 text-base font-semibold text-blue-600">
              Add Image
            </Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              className="w-full h-48 rounded-md mb-6 border border-gray-300"
            />
          )}
        </View>
      </ScrollView>

      {/* Fixed Button at the Bottom */}
      <View className="bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-md items-center shadow-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Create Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CreatePost;
