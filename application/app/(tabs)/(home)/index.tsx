import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, Sliders } from "lucide-react-native";
import { useJobStore } from "@/store/useJobStore";
import { CategoryPill } from "@/components/CategoryPill";
import { JobCard } from "@/components/JobCard";
import { useProfileStore } from "@/store/useProfileStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePostStore } from "@/store/usePostStore";
import PostCard from "@/components/PostCard";

const categories = ["All", "Development", "Designing", "Marketing"];

export default function Home() {
  const router = useRouter();
  const { jobs = [], fetchJobs } = useJobStore();
  const { posts = [], fetchPosts } = usePostStore();
  const { profile } = useProfileStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchJobs();
    fetchPosts();
  }, [fetchJobs, fetchPosts]);

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    router.replace("/(onboarding)");
  };

  const renderHeader = () => (
    <View className="px-4 pt-12 pb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg text-gray-700">Good Morning</Text>
          <Text className="text-2xl font-bold text-black">
            {profile?.name || "Guest"}
          </Text>
        </View>
        <TouchableOpacity onPress={handleClearStorage}>
          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <TextInput
          placeholder="Search Company, Job Profile..."
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity>
          <Sliders className="w-5 h-5 text-gray-400" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <View className="mb-6 px-4">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <CategoryPill
            label={item}
            isSelected={selectedCategory === item}
            onPress={() => setSelectedCategory(item)}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );

  const renderSectionTitle = (title: string, onPress?: () => void) => (
    <View className="flex-row items-center justify-between mb-4 px-4">
      <Text className="text-lg font-semibold text-black">{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-blue-500">View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderJobs = () => (
    <View className="mb-6 py-4">
      {renderSectionTitle("Top Companies Hiring", () =>
        router.push("/(tabs)/(home)")
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-lg font-semibold text-gray-500">
              No Jobs Found
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );

  const renderPosts = () => (
    <View>
      {renderSectionTitle("Latest Posts")}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </View>
  );

  const renderContent = () => {
    const sections = [
      { key: "categories", render: renderCategories },
      { key: "jobs", render: renderJobs },
      { key: "posts", render: renderPosts },
    ];

    return sections.map((section) => (
      <View key={section.key}>{section.render()}</View>
    ));
  };

  return (
    <FlatList
      data={[{ key: "content" }]}
      renderItem={() => <View>{renderContent()}</View>}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
    />
  );
}
