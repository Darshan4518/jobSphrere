import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatState {
  socket: Socket | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, content: string) => void;
  getMessages: (userId: string, otherUserId: string) => Promise<void>;
  markMessagesAsRead: (otherUserId: string) => void;
}

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || "http:///localhost:5000";

export const useChatStore = create<ChatState>((set, get) => ({
  socket: null,
  messages: [],
  isLoading: false,
  error: null,

  connectSocket: (token: string) => {
    try {
      const socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to chat socket");
      });

      socket.on("newMessage", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("messageSent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("messageError", (error: { error: string }) => {
        set({ error: error.error });
      });

      set({ socket, error: null });
    } catch (error) {
      set({ error: "Failed to connect to chat socket" });
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  sendMessage: (receiverId: string, content: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit("sendMessage", { receiverId, content });
    } else {
      set({ error: "Socket not connected" });
    }
  },

  getMessages: async (userId: string, otherUserId: string) => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${SOCKET_URL}/api/messages/${otherUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const messages = await response.json();
      set({ messages, isLoading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch messages", isLoading: false });
    }
  },

  markMessagesAsRead: async (otherUserId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(`${SOCKET_URL}/api/messages/${otherUserId}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.senderId === otherUserId ? { ...msg, read: true } : msg
        ),
      }));
    } catch (error) {
      set({ error: "Failed to mark messages as read" });
    }
  },
}));
