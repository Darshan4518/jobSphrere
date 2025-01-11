import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const UpgradePlan = lazy(() => import("@/components/UpgradePlan"));

const UpgradePremium = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UpgradePlan />
    </Suspense>
  );
};

export default UpgradePremium;
