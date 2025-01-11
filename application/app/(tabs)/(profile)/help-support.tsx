import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";
const HelpSupport = lazy(() => import("@/components/HelpSupport"));
const HelpSupportScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HelpSupport />
    </Suspense>
  );
};

export default HelpSupportScreen;
