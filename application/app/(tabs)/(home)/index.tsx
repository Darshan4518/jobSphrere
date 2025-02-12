import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const Home = lazy(() => import("@/components/Home"));

const HomeScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomeScreen;
