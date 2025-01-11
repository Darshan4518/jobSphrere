import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";
const AddProject = lazy(() => import("@/components/AddProjects"));
const AddProjectScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddProject />
    </Suspense>
  );
};

export default AddProjectScreen;
