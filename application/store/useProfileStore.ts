import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createProfile, updateProfile } from "../services/api";

export interface Profile {
  id?: string;
  userId: string;
  name: string;
  mobile: string;
  email: string;
  age: string;
  gender: string;
  pincode: string;
  landmark: string;
  address: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  createProfile: (profileData: any) => Promise<void>;
  updateProfile: (
    profileId: string,
    profileData: Partial<Profile>
  ) => Promise<void>;
}

export const useProfileStore = create(
  persist<ProfileState>(
    (set, get) => ({
      profile: null,
      loading: false,
      error: null,
      createProfile: async (profileData) => {
        try {
          set({ loading: true, error: null });
          const response = await createProfile(profileData);
          set({ profile: response.data, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      updateProfile: async (profileId, profileData) => {
        try {
          set({ loading: true, error: null });
          const response = await updateProfile(profileId, profileData);
          set({ profile: response.data, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
