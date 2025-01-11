import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const CompanyDetails = lazy(() => import("@/components/CompanyDetailsPage"));

const CompanyDetailsScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CompanyDetails />
    </Suspense>
  );
};

export default CompanyDetailsScreen;
