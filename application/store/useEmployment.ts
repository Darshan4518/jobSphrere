import {
  addEmployment as apiAddEmployment,
  deleteEmployment as apiDeleteEmployment,
  updateEmployment as apiUpdateEmployment,
  getEmployment as apiGetEmployment,
} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Employment {
  id?: string;
  industry: string;
  companyName: string;
  location: string;
  employmentType: string;
  jobTitle: string;
  description?: string;
}

export interface EmploymentState {
  employment: Employment | null;
  loading: boolean;
  error: string | null;
  addEmployment: (employment: Omit<Employment, "id">) => Promise<void>;
  updateEmployment: (
    id: string,
    updatedData: Partial<Employment>
  ) => Promise<void>;
  removeEmployment: (id: string) => Promise<void>;
  fetchEmployment: () => Promise<void>;
}

const useEmploymentStore = create(
  persist<EmploymentState>(
    (set) => ({
      employment: null,
      loading: false,
      error: null,

      addEmployment: async (employment) => {
        try {
          set({ loading: true, error: null });
          const response = await apiAddEmployment(employment);
          set({
            employment: response.data,
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      updateEmployment: async (id, updatedData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiUpdateEmployment(id, updatedData);
          set({
            employment: { ...response.data },
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
      removeEmployment: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await apiDeleteEmployment(id);
          set({ employment: null, loading: false, error: null });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
      fetchEmployment: async () => {
        try {
          set({ loading: true, error: null });
          const response = await apiGetEmployment();
          set({
            employment: response.data,
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
    }),
    {
      name: "employment-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useEmploymentStore;
