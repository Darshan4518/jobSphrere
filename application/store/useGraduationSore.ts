import {
  addGraduation as apiAddGraduation,
  deleteGraduation as apiDeleteGraduation,
  updateGraduation as apiUpdateGraduation,
} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Graduation {
  id: string;
  university: string;
  collegeName: string;
  completionYear: string;
}

export interface GraduationState {
  graduation: Graduation[];
  loading: boolean;
  error: string | null;
  addGraduation: (graduation: Omit<Graduation, "id">) => Promise<void>;
  updateGraduation: (
    id: string,
    updatedData: Partial<Graduation>
  ) => Promise<void>;
  removeGraduation: (graduationId: string) => Promise<void>;
}

const useGraduationStore = create(
  persist<GraduationState>(
    (set) => ({
      graduation: [],
      loading: false,
      error: null,

      addGraduation: async (graduation) => {
        try {
          set({ loading: true, error: null });
          const response = await apiAddGraduation(graduation);
          set((state) => ({
            graduation: [...state.graduation, response.data],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      updateGraduation: async (id, updatedData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiUpdateGraduation(id, updatedData);
          set((state) => ({
            graduation: state.graduation.map((grad) =>
              grad.id === id ? { ...grad, ...response.data } : grad
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      removeGraduation: async (graduationId) => {
        try {
          set({ loading: true, error: null });
          await apiDeleteGraduation(graduationId);
          set((state) => ({
            graduation: state.graduation.filter(
              (grad) => grad.id !== graduationId
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
    }),
    {
      name: "graduation-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGraduationStore;
