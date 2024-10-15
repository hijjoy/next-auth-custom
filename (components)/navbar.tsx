"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="h-[70px] flex justify-between px-5 w-full items-center">
      <h3 onClick={() => router.push("/")}>로고다 임마</h3>
      {session ? (
        <button>로그아웃</button>
      ) : (
        <Link href={"/login"}>로그인</Link>
      )}
    </nav>
  );
}
