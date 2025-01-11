import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";

const Search = lazy(() => import("@/components/Search"));
const SearchScreen = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Search />
    </Suspense>
  );
};

export default SearchScreen;
