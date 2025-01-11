import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
const SignIn = lazy(() => import("@/components/SignIn"));
const SignInScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn />
    </Suspense>
  );
};

export default SignInScreen;
