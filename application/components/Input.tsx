import { View, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff, Mail } from "lucide-react-native";
import { useState } from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  isPassword,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-3 mb-4">
      <Mail className="w-5 h-5 text-gray-400 mr-2" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-base text-gray-900"
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
