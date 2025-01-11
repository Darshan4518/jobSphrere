import React, { Suspense } from "react";
import AddGraduation from "@/components/AddGraduation";
import Loading from "@/components/Loading";

const GraduationScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddGraduation />
    </Suspense>
  );
};

export default GraduationScreen;
