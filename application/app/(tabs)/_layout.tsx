import { useSocket } from "@/hooks/useSocket";
import { useAuthStore } from "@/store/useAuthStore";
import { Tabs } from "expo-router";
import {
  Home,
  MessageSquare,
  Network,
  PlusCircle,
  User,
} from "lucide-react-native";
export default function AppLayout() {
  const token = useAuthStore((state) => state.user?.token);
  useSocket(token);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          tabBarLabel: "Home",
        }}
      />

      <Tabs.Screen
        name="network"
        options={{
          tabBarIcon: ({ color }) => <Network size={24} color={color} />,
          tabBarLabel: "newtwork",
        }}
      />

      <Tabs.Screen
        name="create-post"
        options={{
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />,
          tabBarLabel: "create-post",
        }}
      />

      <Tabs.Screen
        name="(message)"
        options={{
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
          tabBarLabel: "message",
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          tabBarLabel: "profile",
        }}
      />
    </Tabs>
  );
}
