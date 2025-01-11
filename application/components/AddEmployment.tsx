import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Building2, MapPin, Briefcase } from "lucide-react-native";
import { ProgressHeader } from "@/components/ProgressHeader";
import { FormInput } from "@/components/FormInput";
import Button from "@/components/Button";
import { SelectModal } from "@/components/SelectModal";
import useEmploymentStore, { Employment } from "@/store/useEmployment";

const industries = [
  "Accounting & Finance",
  "Architecture",
  "Advertising Service",
  "Hospital & Healthcare",
  "Information Technology",
  "Food Services",
  "Fitness Services",
];

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Internship",
  "Business",
  "Self-employed",
];

const AddEmployment = () => {
  const router = useRouter();
  const { loading, addEmployment, employment, error } = useEmploymentStore();
  const [showIndustryModal, setShowIndustryModal] = useState<boolean>(false);
  const [showEmploymentTypeModal, setShowEmploymentTypeModal] =
    useState<boolean>(false);

  const [employments, setEmployments] = useState<Employment>(
    employment || {
      industry: "",
      employmentType: "",
      companyName: "",
      jobTitle: "",
      location: "",
      description: "",
    }
  );

  const handleInputChange = (field: keyof Employment, value: string) => {
    setEmployments((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!employments.industry || !employments.employmentType) {
      alert("Please complete all required fields.");
      return;
    }
    await addEmployment(employments);
    router.push("/add-project");
  };

  return (
    <View className="flex-1 bg-white">
      <ProgressHeader title="Setup Your Profile" step={4} totalSteps={5} />

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-lg font-semibold mb-4">
            Where do you currently work?
          </Text>

          <View className="bg-blue-50 rounded-lg p-4 mb-6">
            <Text className="text-base font-medium mb-4">Company Details</Text>

            <TouchableOpacity
              onPress={() => setShowIndustryModal(true)}
              className="border-b border-gray-200 py-3 mb-4"
            >
              <Text className="text-sm text-gray-500 mb-1">Industry type</Text>
              <Text
                className={
                  employments.industry ? "text-gray-900" : "text-gray-400"
                }
              >
                {employments.industry || "Select Industry"}
              </Text>
            </TouchableOpacity>

            <FormInput
              icon={Building2}
              placeholder="Company Name"
              value={employments.companyName}
              onChangeText={(text) => handleInputChange("companyName", text)}
            />

            <FormInput
              icon={MapPin}
              placeholder="Location"
              value={employments.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />
          </View>

          <View className="bg-blue-50 rounded-lg p-4">
            <Text className="text-base font-medium mb-4">Job Details</Text>

            <TouchableOpacity
              onPress={() => setShowEmploymentTypeModal(true)}
              className="border-b border-gray-200 py-3 mb-4"
            >
              <Text className="text-sm text-gray-500 mb-1">
                Employment type
              </Text>
              <Text
                className={
                  employments.employmentType ? "text-gray-900" : "text-gray-400"
                }
              >
                {employments.employmentType || "Select Employment Type"}
              </Text>
            </TouchableOpacity>

            <FormInput
              icon={Briefcase}
              placeholder="Job Title (Ex: Designer)"
              value={employments.jobTitle}
              onChangeText={(text) => handleInputChange("jobTitle", text)}
            />

            <View className="mt-4">
              <Text className="text-sm text-gray-500 mb-2">
                Job Description (Optional)
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                className="bg-white rounded-lg p-3 text-gray-900"
                placeholder="Write about your role here"
                value={employments.description}
                onChangeText={(text) => handleInputChange("description", text)}
              />
            </View>
          </View>
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
          onPress={() => router.push("/add-project")}
        >
          <Text className="text-blue-500 text-center">Skip For Now</Text>
        </TouchableOpacity>
      </View>

      <SelectModal
        visible={showIndustryModal}
        onClose={() => setShowIndustryModal(false)}
        title="Select Industry"
        options={industries}
        selectedOption={employments.industry}
        onSelect={(industry) => handleInputChange("industry", industry)}
      />

      <SelectModal
        visible={showEmploymentTypeModal}
        onClose={() => setShowEmploymentTypeModal(false)}
        title="Select Employment Type"
        options={employmentTypes}
        selectedOption={employments.employmentType}
        onSelect={(type) => handleInputChange("employmentType", type)}
      />
    </View>
  );
};

export default AddEmployment;
