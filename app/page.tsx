"use client";

import { useSession } from "next-auth/react";
import FirstComponent from "@/(components)/home/first";
import SecondComponent from "@/(components)/home/second";
import Banner from "@/(components)/home/banner";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="flex flex-col w-full items-center h-full">
      <FirstComponent />
      <SecondComponent />
      <Banner />
    </div>
  );
}
