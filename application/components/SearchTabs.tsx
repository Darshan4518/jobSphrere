import { View, TouchableOpacity, Text } from "react-native";

interface SearchTabsProps {
  activeTab: "all" | "company" | "jobs" | "people";
  onTabChange: (tab: "all" | "company" | "jobs" | "people") => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <View className="flex-row border-b border-gray-200">
      {["all", "company", "jobs", "people"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() =>
            onTabChange(tab as "all" | "company" | "jobs" | "people")
          }
          className={`flex-1 py-3 ${
            activeTab === tab ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-center capitalize ${
              activeTab === tab ? "text-blue-500 font-medium" : "text-gray-600"
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
