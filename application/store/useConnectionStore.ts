import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Connection {
  _id: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "rejected";
  timestamp: Date;
}

interface ConnectionState {
  socket: Socket | null;
  connections: Connection[];
  isLoading: boolean;
  error: string | null;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
  sendConnectionRequest: (receiverId: string) => void;
  updateConnectionStatus: (
    connectionId: string,
    status: "accepted" | "rejected"
  ) => void;
  getConnections: () => Promise<void>;
  getPendingConnections: () => Promise<void>;
}

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  socket: null,
  connections: [],
  isLoading: false,
  error: null,

  connectSocket: (token: string) => {
    try {
      const socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to connection socket");
      });

      socket.on("newConnectionRequest", (connection: Connection) => {
        set((state) => ({
          connections: [...state.connections, connection],
        }));
      });

      socket.on("connectionRequestSent", (connection: Connection) => {
        set((state) => ({
          connections: [...state.connections, connection],
        }));
      });

      socket.on("connectionStatusUpdated", (updatedConnection: Connection) => {
        set((state) => ({
          connections: state.connections.map((conn) =>
            conn._id === updatedConnection._id ? updatedConnection : conn
          ),
        }));
      });

      socket.on("connectionError", (error: { error: string }) => {
        set({ error: error.error });
      });

      set({ socket, error: null });
    } catch (error) {
      set({ error: "Failed to connect to connection socket" });
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  sendConnectionRequest: (receiverId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit("requestConnection", { receiverId });
    } else {
      set({ error: "Socket not connected" });
    }
  },

  updateConnectionStatus: (
    connectionId: string,
    status: "accepted" | "rejected"
  ) => {
    const { socket } = get();
    if (socket) {
      socket.emit("updateConnectionStatus", { connectionId, status });
    } else {
      set({ error: "Socket not connected" });
    }
  },

  getConnections: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${SOCKET_URL}/api/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch connections");

      const connections = await response.json();
      set({ connections, isLoading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch connections", isLoading: false });
    }
  },

  getPendingConnections: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${SOCKET_URL}/api/connections/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch pending connections");

      const connections = await response.json();
      set({ connections, isLoading: false, error: null });
    } catch (error) {
      set({ error: "Failed to fetch pending connections", isLoading: false });
    }
  },
}));
