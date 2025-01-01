import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ProgressHeader } from "@/components/ProgressHeader";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { addProject } from "@/services/api";

export default function AddProject() {
  const router = useRouter();
  const [project, setProject] = useState({
    name: "",
    role: "",
    from: "",
    to: "",
    url: "",
    description: "",
  });

  const handleSubmit = () => {
    addProject(project);
    router.push("/(tabs)/(home)");
  };

  return (
    <View className="flex-1 bg-white">
      <ProgressHeader title="Setup Your Profile" step={5} totalSteps={5} />

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-lg font-semibold mb-4">
            Add Project Details
          </Text>

          <Input
            placeholder="Project Name"
            value={project.name}
            onChangeText={(text) =>
              setProject((prev) => ({ ...prev, name: text }))
            }
          />

          <Input
            placeholder="Role"
            value={project.role}
            onChangeText={(text) =>
              setProject((prev) => ({ ...prev, role: text }))
            }
          />

          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <Input
                placeholder="From"
                value={project.from}
                onChangeText={(text) =>
                  setProject((prev) => ({ ...prev, from: text }))
                }
              />
            </View>
            <View className="flex-1">
              <Input
                placeholder="To"
                value={project.to}
                onChangeText={(text) =>
                  setProject((prev) => ({ ...prev, to: text }))
                }
              />
            </View>
          </View>

          <Input
            placeholder="Project URL"
            value={project.url}
            onChangeText={(text) =>
              setProject((prev) => ({ ...prev, url: text }))
            }
          />

          <View className="mt-4">
            <Text className="text-sm text-gray-500 mb-2">
              Project Description (Optional)
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              className="bg-gray-50 rounded-lg p-3 text-gray-900"
              placeholder="Write about your project here"
              value={project.description}
              onChangeText={(text) =>
                setProject((prev) => ({ ...prev, description: text }))
              }
            />
          </View>
        </View>
      </ScrollView>

      <View className="p-4">
        <Button
          title="Save & Continue"
          onPress={handleSubmit}
          className="w-full"
        />

        <TouchableOpacity
          className="w-full mt-2"
          onPress={() => router.push("/(tabs)/(home)")}
        >
          <Text className=" text-blue-500 text-center">Skip For Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
