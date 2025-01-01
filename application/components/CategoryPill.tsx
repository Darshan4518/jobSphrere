import { TouchableOpacity, Text } from "react-native";

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function CategoryPill({
  label,
  isSelected,
  onPress,
}: CategoryPillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 ${
        isSelected ? "bg-blue-500" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-sm ${isSelected ? "text-white" : "text-gray-600"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
