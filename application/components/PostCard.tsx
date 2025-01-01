import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";
import FollowButton from "./FollowButton";
interface IPost {
  userId: {
    name: string;
    _id: string;
    employment: {
      jobTitle: string;
    };
  };
  content: string;
  qualifications: string;
  likes: { _id: string }[];
  comments: { user: { name: string }; content: string }[];
  createdAt: string;
}

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const dateTimeAgo = post?.createdAt
    ? moment(new Date(post.createdAt)).fromNow()
    : "";

  return (
    <View className="bg-white rounded-lg shadow-md p-4 m-2">
      {/* Header Section */}
      <TouchableOpacity
        className="flex-row items-center mb-4 justify-between"
        onPress={() => router.push(`/user/${post?.userId?._id}`)}
      >
        <View className=" flex-row gap-2 items-center">
          <Image
            source={{
              uri: "https://via.placeholder.com/50",
            }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="text-lg font-bold">{post?.userId?.name}</Text>
            <Text className="text-sm text-gray-500">
              {post?.userId?.employment?.jobTitle}
            </Text>
          </View>
        </View>
        <FollowButton receiverId={post?.userId?._id} />
      </TouchableOpacity>

      {/* Body Section */}
      <Text className="text-sm text-gray-700 leading-6">{post?.content}</Text>
      <Text className="text-sm text-gray-900 leading-6 mt-2">
        Qualifications:{" "}
        <Text className="text-sm text-blue-400 leading-6">
          {post?.qualifications}
        </Text>
      </Text>

      {/* Footer Section */}
      <View className="flex-row justify-between items-center mt-4">
        <TouchableOpacity className="flex-row items-center">
          <FontAwesome name="thumbs-up" size={20} color="#007AFF" />
          <Text className="text-blue-500 text-sm ml-2">
            {post?.likes?.length} Likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <FontAwesome name="comment" size={20} color="#007AFF" />
          <Text className="text-blue-500 text-sm ml-2">
            {post?.comments?.length} Comments
          </Text>
        </TouchableOpacity>
        <Text className="text-xs text-gray-500">{dateTimeAgo}</Text>
      </View>
    </View>
  );
};

export default PostCard;
