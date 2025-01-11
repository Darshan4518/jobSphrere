import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";
const SignUp = lazy(() => import("@/components/Signup"));
const SignUpScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignUp />
    </Suspense>
  );
};

export default SignUpScreen;
