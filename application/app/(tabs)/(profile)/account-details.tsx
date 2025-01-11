import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";
const AccountDetails = lazy(() => import("@/components/AccounDetails"));

const AccountDetailsScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AccountDetails />
    </Suspense>
  );
};

export default AccountDetailsScreen;
