import React, { useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, Briefcase, Clock } from "lucide-react-native";
import { useJobStore } from "@/store/useJobStore";
import moment from "moment";

const CompanyDetails = () => {
  const router = useRouter();
  const { job, fetchJob } = useJobStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    fetchJob(id);
  }, [id, fetchJob]);

  const dateTimeAgo = job?.createdAt
    ? moment(new Date(job.createdAt)).fromNow()
    : "";

  return (
    <View className="flex-1 bg-white">
      <View className="h-15 justify-center px-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 justify-center"
        >
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-5 items-center bg-white rounded-xl m-4 shadow-md">
          <View className="w-15 h-15 rounded-full bg-pink-100 justify-center items-center mb-4">
            <Briefcase size={24} color="#FF69B4" />
          </View>

          <Text className="text-xl font-semibold mb-1">
            {job?.title || "Graphic Designer"}
          </Text>
          <Text className="text-base text-gray-500 mb-2.5">
            {job?.company || "Polar Web-design"}
          </Text>

          <View className="flex-row items-center mb-2.5">
            <MapPin size={16} color="#666" />
            <Text className="ml-1 text-gray-600">
              {job?.location || "California, United States"}
            </Text>
          </View>

          <Text className="text-base font-semibold text-gray-700 mb-2.5">
            {job?.salary}
          </Text>

          <View className="flex-row items-center mb-4">
            <Clock size={16} color="#666" />
            <Text className="ml-1 text-gray-600">{dateTimeAgo}</Text>
          </View>

          <TouchableOpacity className="bg-blue-500 px-8 py-3 rounded-full mt-2.5">
            <Text className="text-white text-base font-semibold">
              Apply For Job
            </Text>
          </TouchableOpacity>
        </View>

        <View className="p-3">
          <Text className=" mb-3 border-b border-blue-500 py-2 text-xl">
            Description
          </Text>
          <View className="mb-5">
            <Text className="text-base font-semibold text-gray-700 mb-2.5">
              {job?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CompanyDetails;
