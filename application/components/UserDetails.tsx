import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft } from "lucide-react-native";
const UserDetail = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  const tabs = ["Profile", "Posts", "Connection"];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-4">Profile</Text>
      </View>

      {/* User Info */}
      <View className="p-4 items-center bg-white border-b border-gray-200">
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with your actual image URL
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-lg font-bold mt-3">Andrew Michel</Text>
        <Text className="text-sm text-gray-500">Sr. Android Developer at</Text>
        <Text className="text-blue-600">Poler Web-design</Text>
        <View className="border-t border-gray-200 w-full my-4" />
        <Text className="text-sm text-gray-500 text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <Text className="mt-2 text-sm font-semibold">3k+ Followers</Text>
        <View className="flex-row mt-4">
          <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full mr-4">
            <Text className="text-white font-medium">Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
            <Text className="text-white font-medium">Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-between px-4 py-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className="flex-1"
          >
            <Text
              className={`text-center font-medium ${
                selectedTab === tab ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
            {selectedTab === tab && (
              <View className="h-1 bg-blue-600 mt-1 rounded-full" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView className="p-4">
        {selectedTab === "Profile" && (
          <View>
            <Text className="text-lg font-semibold mb-4">About</Text>
            <Text className="text-sm text-gray-500 mb-2">
              • Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            <Text className="text-sm text-gray-500 mb-2">
              • Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s.
            </Text>
            <Text className="text-sm text-gray-500 mb-2">
              • When an unknown printer took a galley of type and scrambled it
              to make a type specimen book.
            </Text>
            <Text className="text-sm text-gray-500">
              • It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
        )}
        {selectedTab === "Posts" && (
          <View>
            <Text className="text-center text-gray-500 mt-4">
              No posts available.
            </Text>
          </View>
        )}
        {selectedTab === "Connection" && (
          <View>
            <Text className="text-center text-gray-500 mt-4">
              No connections yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default UserDetail;
