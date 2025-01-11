import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const Messages = lazy(() => import("@/components/Message"));

const MessageScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Messages />
    </Suspense>
  );
};

export default MessageScreen;
