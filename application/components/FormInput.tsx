import { View, TextInput, TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface FormInputProps extends TextInputProps {
  icon: LucideIcon;
}

export function FormInput({ icon: Icon, ...props }: FormInputProps) {
  return (
    <View className="flex-row items-center border-b border-gray-200 py-3 mb-4">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}
