import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface ProgressHeaderProps {
  title: string;
  step: number;
  totalSteps: number;
}

export function ProgressHeader({
  title,
  step,
  totalSteps,
}: ProgressHeaderProps) {
  const router = useRouter();

  return (
    <View className="px-4 pt-12 pb-6">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft className="w-6 h-6" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold mb-2">{title}</Text>
      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </View>
    </View>
  );
}
