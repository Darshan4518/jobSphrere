import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const AddEducation = lazy(() => import("@/components/AddEducation"));

const EducationScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddEducation />
    </Suspense>
  );
};

export default EducationScreen;
