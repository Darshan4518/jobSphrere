import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJob, getJob, getJobs } from "../services/api";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  postedBy: string;
  createdAt: string;
  qualifications?: string;
}

interface JobState {
  jobs: Job[];
  job: Job | null;
  loading: boolean;
  error: string | null;
  createJob: (jobData: Omit<Job, "id" | "createdAt">) => Promise<void>;
  fetchJobs: () => Promise<void>;
  fetchJob: (id: string) => Promise<void>;
}

export const useJobStore = create(
  persist<JobState>(
    (set) => ({
      jobs: [],
      job: null,
      loading: false,
      error: null,
      createJob: async (jobData) => {
        try {
          set({ loading: true, error: null });
          const response = await createJob(jobData);
          set((state) => ({
            jobs: [...state.jobs, response.data],
            loading: false,
          }));
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
      fetchJobs: async () => {
        try {
          set({ loading: true, error: null });
          const response = await getJobs();
          set({ jobs: response.data, loading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
      fetchJob: async (id: string) => {
        try {
          set({ loading: true, error: null });
          const response = await getJob(id);

          set({ job: response.data, loading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
    }),
    {
      name: "job-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
