import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const UserDetail = lazy(() => import("@/components/UserDetails"));

const ProfileDetailsScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserDetail />
    </Suspense>
  );
};

export default ProfileDetailsScreen;
