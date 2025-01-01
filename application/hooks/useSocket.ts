import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useConnectionStore } from "../store/useConnectionStore";

export const useSocket = (token: string | null) => {
  const connectChatSocket = useChatStore((state) => state.connectSocket);
  const disconnectChatSocket = useChatStore((state) => state.disconnectSocket);
  const connectConnectionSocket = useConnectionStore(
    (state) => state.connectSocket
  );
  const disconnectConnectionSocket = useConnectionStore(
    (state) => state.disconnectSocket
  );

  useEffect(() => {
    if (token) {
      connectChatSocket(token);
      connectConnectionSocket(token);
    }

    return () => {
      disconnectChatSocket();
      disconnectConnectionSocket();
    };
  }, [
    token,
    connectChatSocket,
    disconnectChatSocket,
    connectConnectionSocket,
    disconnectConnectionSocket,
  ]);
};
