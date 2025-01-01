import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addProject, updateProject, deleteProject } from "@/services/api";

export interface Project {
  id: string;
  user: string; // User ID
  name: string;
  role: string;
  from: string;
  to: string;
  url?: string;
  description?: string;
}

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, updatedData: Partial<Project>) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
}

const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      projects: [],
      loading: false,
      error: null,

      addProject: async (project) => {
        try {
          set({ loading: true, error: null });
          const response = await addProject(project);
          set((state) => ({
            projects: [...state.projects, response.data],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      updateProject: async (id, updatedData) => {
        try {
          set({ loading: true, error: null });
          const response = await updateProject(id, updatedData);
          set((state) => ({
            projects: state.projects.map((proj) =>
              proj.id === id ? { ...proj, ...response.data } : proj
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      removeProject: async (projectId) => {
        try {
          set({ loading: true, error: null });
          await deleteProject(projectId);
          set((state) => ({
            projects: state.projects.filter((proj) => proj.id !== projectId),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "project-store", // Key for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useProjectStore;
