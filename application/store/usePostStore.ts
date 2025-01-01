import { create } from "zustand";
import { createPost, getPosts } from "../services/api";

interface PostState {
  posts: any[];
  loading: boolean;
  error: string | null;
  createPost: (postData: any) => Promise<void>;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  createPost: async (postData) => {
    try {
      set({ loading: true, error: null });
      const response = await createPost(postData);
      set((state) => ({
        posts: [response.data, ...state.posts],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },
  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getPosts();
      set({ posts: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },
}));
