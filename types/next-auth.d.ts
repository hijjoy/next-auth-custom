import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["User"];
    expires: string;
    accessToken: string;
    refreshToken?: string;
    socialType: string;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    result: {
      accessToken: string;
      refreshToken: string;
      socialType: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    socialType: string;
  }
}
