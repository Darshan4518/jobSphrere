import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
const ProfileNavigation = lazy(() => import("@/components/ProfileNavigation"));

const ProfileNavigationScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileNavigation />
    </Suspense>
  );
};

export default ProfileNavigationScreen;
