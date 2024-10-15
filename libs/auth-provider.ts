"use client";

import { signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { data: session } = useSession();

  useEffect(() => {
    /* Refresh Token 만료되었을 때 */
    if (session?.error === "RefreshAccessTokenError") {
      alert("리프레시 토큰 만료. 로그아웃 합니다");
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return children;
}
