import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Company {
  id: string;
  name: string;
  logo: string;
  type: string;
  description: string;
  location: string;
  followers: number;
  website?: string;
  instagram?: string;
  facebook?: string;
  isFollowing: boolean;
}

interface Person {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  location: string;
  followers: number;
  isFollowing: boolean;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    company: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface SearchState {
  searchQuery: string;
  activeTab: "all" | "company" | "jobs" | "people";
  companies: Company[];
  people: Person[];
  posts: Post[];
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: "all" | "company" | "jobs" | "people") => void;
  toggleFollowCompany: (companyId: string) => void;
  toggleFollowPerson: (personId: string) => void;
}

export const useSearchStore = create(
  persist<SearchState>(
    (set) => ({
      searchQuery: "",
      activeTab: "all",
      companies: [
        {
          id: "1",
          name: "UX Design Labs",
          logo: "/placeholder.svg?height=48&width=48",
          type: "Information & Technology Company",
          description:
            "UX Design labs specialized in B2B web app professional team of talented UI Designer.",
          location: "California, United States",
          followers: 5200,
          website: "www.domain.com",
          instagram: "www.instagram.com/domain",
          facebook: "www.facebook.com/domain",
          isFollowing: false,
        },
        {
          id: "2",
          name: "Gen Design Studio",
          logo: "/placeholder.svg?height=48&width=48",
          type: "Information & Technology Company, Marketing",
          description:
            "UX Design labs specialized in B2B web app professional team of talented UI Designer.",
          location: "London, New York",
          followers: 3400,
          isFollowing: false,
        },
      ],
      people: [
        {
          id: "1",
          name: "Andrew Michel",
          avatar: "/placeholder.svg?height=48&width=48",
          role: "Android Developer at Microsoft",
          company: "Microsoft",
          location: "London, New York",
          followers: 1000,
          isFollowing: false,
        },
        {
          id: "2",
          name: "Brooke eagle",
          avatar: "/placeholder.svg?height=48&width=48",
          role: "Sr Technical Administrative at Google",
          company: "Google",
          location: "Paris, France",
          followers: 1500,
          isFollowing: false,
        },
      ],
      posts: [
        {
          id: "1",
          author: {
            name: "Christine joel",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "HR Consultant & manager at",
            company: "Polar Web-design",
          },
          content:
            "Are you looking for a talented individual to join your team? Look no further! We are currently seeking a motivated and skilled individual to fill a position at our company.",
          timestamp: "15 mins ago",
          likes: 15,
        },
      ],
      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleFollowCompany: (companyId) =>
        set((state) => ({
          companies: state.companies.map((company) =>
            company.id === companyId
              ? { ...company, isFollowing: !company.isFollowing }
              : company
          ),
        })),
      toggleFollowPerson: (personId) =>
        set((state) => ({
          people: state.people.map((person) =>
            person.id === personId
              ? { ...person, isFollowing: !person.isFollowing }
              : person
          ),
        })),
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
