import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";

const Networks = lazy(() => import("@/components/Network"));

const NetworkScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Networks />
    </Suspense>
  );
};

export default NetworkScreen;
