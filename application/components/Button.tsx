import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
  loading?: boolean;
}

const Button = ({ title, onPress, className, loading }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-blue-500 rounded-full py-4 items-center ${className}`}
      onPress={onPress}
      disabled={loading}
    >
      <Text className="text-white font-semibold text-base">
        {loading ? "Saving.." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
