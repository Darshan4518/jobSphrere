import axios from "axios";
import { Employment } from "@/store/useEmployment";
import { useAuthStore } from "@/store/useAuthStore";
const API_URL = "http://192.168.63.129:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ------------------ AUTHENTICATION ------------------ //
/**
 * Register a new user
 * @param userData - User registration data
 */
export const signUp = (userData: any) => api.post("/auth/signup", userData);

/**
 * Sign in an existing user
 * @param credentials - User credentials (email, password)
 */
export const signIn = (credentials: any) =>
  api.post("/auth/signin", credentials);

/**
 * Upload user profile picture
 * @param file - File object to upload
 */
export const uploadProfilePicture = (file: File) => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  return api.post("/auth/upload-profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ------------------ PROFILE ------------------ //
/**
 * Create a new user profile
 * @param profileData - Profile data object
 */
export const createProfile = (profileData: any) =>
  api.post("/profile", profileData);

/**
 * Update an existing user profile
 * @param profileId - Profile ID to update
 * @param profileData - Updated profile data
 */
export const updateProfile = (profileId: string, profileData: any) =>
  api.put(`/profile/${profileId}`, profileData);

// ------------------ EDUCATION ------------------ //
/**
 * Add a new education record
 * @param educationData - Education data object
 */
export const addEducation = (educationData: any) =>
  api.post(`/education`, educationData);

/**
 * Update an existing education record
 * @param educationId - Education ID to update
 * @param educationData - Updated education data
 */
export const updateEducation = (educationId: string, educationData: any) =>
  api.put(`/education/${educationId}`, educationData);

/**
 * Delete an education record
 * @param educationId - Education ID to delete
 */
export const deleteEducation = (educationId: string) =>
  api.delete(`/education/${educationId}`);

// ------------------ GRADUATION ------------------ //
/**
 * Add a new graduation record
 * @param graduationData - Graduation data object
 */
export const addGraduation = (graduationData: any) =>
  api.post(`/graduation`, graduationData);

/**
 * Update an existing graduation record
 * @param graduationId - Graduation ID to update
 * @param graduationData - Updated graduation data
 */
export const updateGraduation = (graduationId: string, graduationData: any) =>
  api.put(`/graduation/${graduationId}`, graduationData);

/**
 * Delete a graduation record
 * @param graduationId - Graduation ID to delete
 */
export const deleteGraduation = (graduationId: string) =>
  api.delete(`/graduation/${graduationId}`);

// ------------------ EMPLOYMENT ------------------ //
/**
 * Add a new employment record
 * @param employmentData - Employment data object
 */
export const addEmployment = (employmentData: any) =>
  api.post(`/employment`, employmentData);

/**
 * Update an existing employment record
 * @param id - Employment ID to update
 * @param updatedData - Updated employment data
 */
export const updateEmployment = (
  id: string,
  updatedData: Partial<Employment>
) => api.put(`/employment/${id}`, updatedData);

/**
 * Delete an employment record
 * @param id - Employment ID to delete
 */
export const deleteEmployment = (id: string) => api.delete(`/employment/${id}`);

export const getEmployment = () => api.get(`/employment`);

// ------------------ PROJECT ------------------ //
/**
 * Add a new project
 * @param projectData - Project data object
 */
export const addProject = (projectData: any) =>
  api.post(`/project`, projectData);

/**
 * Update an existing project
 * @param projectId - Project ID to update
 * @param updatedData - Updated project data
 */
export const updateProject = (projectId: string, updatedData: any) =>
  api.put(`/project/${projectId}`, updatedData);

/**
 * Delete a project
 * @param projectId - Project ID to delete
 */
export const deleteProject = (projectId: string) =>
  api.delete(`/project/${projectId}`);

// ------------------ JOBS ------------------ //
/**
 * Create a new job
 * @param jobData - Job data object
 */
export const createJob = (jobData: any) => api.post("/jobs", jobData);

/**
 * Get all available jobs
 */
export const getJobs = () => api.get("/jobs");
export const getJob = (id: string) => api.get(`/jobs/${id}`);

// ------------------ CHAT ------------------ //
/**
 * Send a new chat message
 * @param chatData - Chat data object
 */
export const sendMessage = (chatData: any) => api.post("/chat", chatData);

/**
 * Get chat messages by chat ID
 * @param chatId - Chat ID
 */
export const getChat = (chatId: string) => api.get(`/chat/${chatId}`);

// ------------------ POSTS ------------------ //
/**
 * Create a new post
 * @param postData - Post data object
 */
export const createPost = (postData: any) => api.post("/posts", postData);

/**
 * Get all posts
 */
export const getPosts = () => api.get("/posts");

// ------------------ NETWORK ------------------ //
/**
 * Send a connection request
 * @param recipientId - ID of the recipient
 */
export const sendConnectionRequest = (recipientId: string) =>
  api.post("/network/request", { recipientId });

/**
 * Update the status of a connection request
 * @param requestId - Connection request ID
 * @param status - New status (accepted/rejected)
 */
export const updateConnectionStatus = (requestId: string, status: string) =>
  api.put(`/network/request/${requestId}`, { status });

/**
 * Get all connection requests
 */
export const getConnectionRequests = () => api.get("/network/requests");

// Export Axios Instance
export default api;
