import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
const AddEmployment = lazy(() => import("@/components/AddEmployment"));

const EmploymentScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddEmployment />
    </Suspense>
  );
};

export default EmploymentScreen;
