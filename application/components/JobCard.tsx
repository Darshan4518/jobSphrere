import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { BookmarkIcon } from "lucide-react-native";

interface JobCardProps {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  qualification?: string;
  description?: string;
  postedTime?: string;
}

interface JobCard {
  job: JobCardProps;
}

export function JobCard({ job }: JobCard) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/company/${job?._id}`)}
      className="bg-white p-4 rounded-xl shadow-sm mx-3"
      style={{
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
    >
      {/* Header Section */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: job.companyLogo || "https://via.placeholder.com/100",
            }}
            className="w-10 h-10 rounded-lg mr-3"
          />
          <View>
            <Text className="text-lg font-semibold text-black">
              {job.title || "Job Title"}
            </Text>
            <Text className="text-gray-500">
              {job.company || "Company Name"}
            </Text>
          </View>
        </View>
        <BookmarkIcon className="w-6 h-6 text-gray-400" />
      </View>

      {/* Details Section */}
      <View className="mt-3">
        <Text className="text-gray-600">
          {job.location || "Location not specified"}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-blue-500 font-medium">
            {job.salary || "Salary not disclosed"}
          </Text>
          <Text className="text-gray-400">
            {job.postedTime || "5 days ago"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
