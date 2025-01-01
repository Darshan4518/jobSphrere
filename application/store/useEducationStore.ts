import {
  addEducation as apiAddEducation,
  deleteEducation as apiDeleteEducation,
  updateEducation as apiUpdateEducation,
} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Education {
  id?: string;
  board: string;
  schoolName: string;
  completionYear: string;
}

export interface EducationState {
  education: Education[];
  loading: boolean;
  error: string | null;
  addEducation: (education: Omit<Education, "id">) => Promise<void>;
  updateEducation: (
    id: string,
    updatedData: Partial<Education>
  ) => Promise<void>;
  removeEducation: (educationId: string) => Promise<void>;
}

const useEducationStore = create(
  persist<EducationState>(
    (set) => ({
      education: [],
      loading: false,
      error: null,

      addEducation: async (education) => {
        try {
          set({ loading: true, error: null });
          const response = await apiAddEducation(education);
          set((state) => ({
            education: [...state.education, response.data],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      updateEducation: async (id, updatedData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiUpdateEducation(id, updatedData);
          set((state) => ({
            education: state.education.map((edu) =>
              edu.id === id ? { ...edu, ...response.data } : edu
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      removeEducation: async (educationId) => {
        try {
          set({ loading: true, error: null });
          await apiDeleteEducation(educationId);
          set((state) => ({
            education: state.education.filter((edu) => edu.id !== educationId),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
    }),
    {
      name: "education-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useEducationStore;
