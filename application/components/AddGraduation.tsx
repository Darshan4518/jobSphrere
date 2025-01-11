import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { GraduationCap, School, Calendar, Plus, X } from "lucide-react-native";
import { ProgressHeader } from "@/components/ProgressHeader";
import { FormInput } from "@/components/FormInput";
import Button from "@/components/Button";
import useGraduationStore from "@/store/useGraduationSore";

interface Graduation {
  university: string;
  collegeName: string;
  completionYear: string;
}

const AddGraduation = () => {
  const router = useRouter();

  const { graduation, addGraduation, loading, error } = useGraduationStore();

  const [graduations, setGraduations] = useState<Graduation[]>(
    graduation || [{ university: "", collegeName: "", completionYear: "" }]
  );

  const addGraduations = () => {
    setGraduations([
      ...graduations,
      { university: "", collegeName: "", completionYear: "" },
    ]);
  };

  const removeGraduation = (index: number) => {
    setGraduations(graduations.filter((_, i) => i !== index));
  };

  const updateGraduation = (
    index: number,
    field: keyof Graduation,
    value: string
  ) => {
    const newGraduation = [...graduations];
    newGraduation[index] = { ...newGraduation[index], [field]: value };
    setGraduations(newGraduation);
  };
  const handleSubmit = async () => {
    try {
      for (const grad of graduations) {
        await addGraduation(grad);
      }
      router.push("/employment");
    } catch (error) {
      console.error("Error submitting education:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ProgressHeader title="Setup Your Profile" step={3} totalSteps={5} />
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-lg font-semibold mb-4">Graduation</Text>

          {graduations.map((grad, index) => (
            <View key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-medium">Enter Details</Text>
                <TouchableOpacity onPress={() => removeGraduation(index)}>
                  <X className="w-5 h-5 text-gray-500" />
                </TouchableOpacity>
              </View>

              <FormInput
                icon={GraduationCap}
                placeholder="Select University"
                value={grad.university}
                onChangeText={(text) =>
                  updateGraduation(index, "university", text)
                }
              />

              <FormInput
                icon={School}
                placeholder="College / University Name"
                value={grad.collegeName}
                onChangeText={(text) =>
                  updateGraduation(index, "collegeName", text)
                }
              />

              <FormInput
                icon={Calendar}
                placeholder="Completion Year"
                value={grad.completionYear}
                onChangeText={(text) =>
                  updateGraduation(index, "completionYear", text)
                }
                keyboardType="number-pad"
              />
            </View>
          ))}

          <TouchableOpacity
            onPress={addGraduations}
            className="flex-row items-center justify-center py-4"
          >
            <Plus className="w-5 h-5 text-blue-500 mr-2" />
            <Text className="text-blue-500 font-medium">Add More Details</Text>
          </TouchableOpacity>
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
          onPress={() => router.push("/employment")}
        >
          <Text className=" text-center"> Skip For Now</Text>
        </TouchableOpacity>
      </View>

      {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
    </View>
  );
};
export default AddGraduation;
