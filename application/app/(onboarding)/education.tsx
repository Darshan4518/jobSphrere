import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { GraduationCap, School, Calendar, Plus, X } from "lucide-react-native";
import { useState, useCallback } from "react";
import { ProgressHeader } from "@/components/ProgressHeader";
import { FormInput } from "@/components/FormInput";
import Button from "@/components/Button";
import useEducationStore, { Education } from "@/store/useEducationStore";

export default function EducationScreen() {
  const router = useRouter();
  const { education, addEducation, loading } = useEducationStore();

  const [educations, setEducations] = useState<Education[]>(
    education || [{ board: "", schoolName: "", completionYear: "" }]
  );

  // Add new education entry
  const addEducations = () => {
    setEducations((prev) => [
      ...prev,
      { board: "", schoolName: "", completionYear: "" },
    ]);
  };

  // Remove an education entry
  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setEducations((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      for (const edu of educations) {
        await addEducation(edu);
      }
      router.push("/graduation");
    } catch (error) {
      console.error("Error submitting education:", error);
    }
  }, [addEducation, educations, router]);

  // Education Item Component
  const EducationItem = ({
    edu,
    index,
  }: {
    edu: { board: string; schoolName: string; completionYear: string };
    index: number;
  }) => (
    <View key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-medium">Enter Details</Text>
        <TouchableOpacity onPress={() => removeEducation(index)}>
          <X className="w-5 h-5 text-gray-500" />
        </TouchableOpacity>
      </View>

      <FormInput
        icon={GraduationCap}
        placeholder="Select Board / University"
        value={edu.board}
        onChangeText={(text) => updateEducation(index, "board", text)}
      />

      <FormInput
        icon={School}
        placeholder="School Name"
        value={edu.schoolName}
        onChangeText={(text) => updateEducation(index, "schoolName", text)}
      />

      <FormInput
        icon={Calendar}
        placeholder="Completion Year"
        value={edu.completionYear}
        onChangeText={(text) => updateEducation(index, "completionYear", text)}
        keyboardType="number-pad"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ProgressHeader title="Setup Your Profile" step={2} totalSteps={5} />

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-lg font-semibold mb-4">Education</Text>

          {educations.map((edu, index) => (
            <EducationItem key={index} edu={edu} index={index} />
          ))}

          <TouchableOpacity
            onPress={addEducations}
            className="flex-row items-center justify-center py-4"
          >
            <Plus className="w-5 h-5 text-blue-500 mr-2" />
            <Text className="text-blue-500 font-medium">Add More Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-4">
        <Button title="Submit" onPress={handleSubmit} loading={loading} />
        <TouchableOpacity
          className="w-full mt-2"
          onPress={() => router.push("/graduation")}
        >
          <Text className="text-center text-blue-500">Skip For Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
