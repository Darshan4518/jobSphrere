import React, { Suspense } from "react";
import AddProfile from "@/components/AddProfile";
import Loading from "@/components/Loading";

const SetupProfile = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddProfile />
    </Suspense>
  );
};

export default SetupProfile;
