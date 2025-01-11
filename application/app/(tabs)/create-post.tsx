import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const CreatePost = lazy(() => import("@/components/CreatePost"));

const CreatePostScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CreatePost />
    </Suspense>
  );
};

export default CreatePostScreen;
