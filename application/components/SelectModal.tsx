import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { X } from "lucide-react-native";

interface SelectModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
}

export function SelectModal({
  visible,
  onClose,
  title,
  options,
  onSelect,
  selectedOption,
}: SelectModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-xl">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X className="w-6 h-6" />
            </TouchableOpacity>
          </View>
          <ScrollView className="max-h-[70%]">
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
                className={`p-4 border-b border-gray-100 ${
                  selectedOption === option ? "bg-blue-50" : ""
                }`}
              >
                <Text
                  className={`${
                    selectedOption === option ? "text-blue-500" : ""
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
