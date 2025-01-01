import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp, signIn, uploadProfilePicture } from "../services/api";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (userData: any) => Promise<void>;
  signIn: (credentials: any) => Promise<void>;
  logOut: () => void;
  uploadProfilePicture: (file: File) => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      signUp: async (userData) => {
        try {
          set({ loading: true, error: null });
          const response = await signUp(userData);
          set({ user: response.data, loading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
      signIn: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const response = await signIn(credentials);
          set({ user: response.data, loading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
      logOut: () => {
        set({ user: null });
      },
      uploadProfilePicture: async (file) => {
        try {
          set({ loading: true, error: null });
          const response = await uploadProfilePicture(file);
          set((state) => ({
            user: state.user
              ? { ...state.user, profilePicture: response.data.profilePicture }
              : null,
            loading: false,
          }));
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
