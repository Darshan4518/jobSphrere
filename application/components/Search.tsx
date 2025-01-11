import { View, TextInput, ScrollView, Image, Text } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";
import { SearchTabs } from "@/components/SearchTabs";
import { CompanyCard } from "@/components/CompanyCard";
import { PersonCard } from "@/components/PersonCard";
import { useSearchStore } from "@/store/useSearchStore";

export default function Search() {
  const {
    searchQuery,
    activeTab,
    companies,
    people,
    setSearchQuery,
    setActiveTab,
    toggleFollowCompany,
    toggleFollowPerson,
  } = useSearchStore();

  const hasResults = companies.length > 0 || people.length > 0;

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-4">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
          <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {!hasResults ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-xl font-semibold text-center mb-2">
            No Match Found
          </Text>
          <Text className="text-gray-500 text-center">
            Sorry! The keyword you are looking for is not found. Please try with
            different keywords.
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4">
          {(activeTab === "all" || activeTab === "company") &&
            companies.map((company) => (
              <CompanyCard
                key={company.id}
                {...company}
                onToggleFollow={() => toggleFollowCompany(company.id)}
              />
            ))}

          {(activeTab === "all" || activeTab === "people") &&
            people.map((person) => (
              <PersonCard
                key={person.id}
                {...person}
                onToggleFollow={() => toggleFollowPerson(person.id)}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
}
