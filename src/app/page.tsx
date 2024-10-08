// src/page.tsx

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      {/* <div className="bg-white-700 mx-auto my-5 w-[50%] h-[480px]"> */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-[100%] h-[100%] overflow-hidden">
        <Map />
      </div>
    </>
  );
}
