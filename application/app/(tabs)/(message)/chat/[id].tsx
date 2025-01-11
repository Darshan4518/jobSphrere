import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";

const Chat = lazy(() => import("@/components/Chat"));
const ChatScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Chat />
    </Suspense>
  );
};

export default ChatScreen;
