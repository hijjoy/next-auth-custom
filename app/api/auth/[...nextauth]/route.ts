import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { axiosClient, axiosInstance } from "@/libs/axiosInstance";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/profile";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axiosInstance.post("/api/v1/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data) {
            return res.data;
          }
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          throw new Error(
            axiosError.response?.data?.message || "로그인에 실패했습니다."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  events: {
    // signOut 할 때 실행되는 이벤트
    // 로그아웃 로직이 스웨거에 없어서 일단 예시로 써둠
    // async signOut(message) {
    //   try {
    //     await axiosInstance.post("/api/v1/logout", {
    //       refresh: message.token.refreshToken,
    //     });
    //   } catch (error) {
    //     console.error("Sign out", error);
    //   }
    // },
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      /*
        액세스 토큰의 만료를 체크, 만료된 토큰 재발급 (토큰 리프레시)
        리프레시 토큰이 만료되었으면 로그아웃, 메시지 전달
       */

      /* 최초 로그인시 동작 */
      if (user) {
        token.accessToken = user.result.accessToken;
        token.refreshToken = user.result.refreshToken;
        token.socialType = user.result.socialType;
        token.accessTokenExpires = Math.floor(Date.now() / 1000) + 30;
      }

      // 현재시간으로 토큰 만료되었는지 판단
      const nowTime = Math.floor(Date.now() / 1000);
      const shouldRefreshTime = (token.accessTokenExpires as number) - nowTime;

      console.log("남은시간: ", shouldRefreshTime);

      // 토큰이 만료되지 않았을 때
      if (shouldRefreshTime > 0) {
        return token;
      }

      // 토큰이 만료 되었을 때 - 리프레시 토큰 로직
      try {
        const res = await axiosClient.get("/api/v1/auth/reissueToken", {
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
        });

        console.log(res);

        return {
          ...token,
          refreshToken: res.data.result.refreshToken,
          accessToken: res.data.result.accessToken,
          accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 5, // 새로운 만료 시간 설정
        };
      } catch (error) {
        console.error(error);
        /* 리프레시 토큰 에러로 클라이언트에 에러 내용 전달 후 클라이언트에서 처리 -> Provider로 처리함*/
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      /* 클라이언트에서 확인할 때 호출 */

      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.socialType = token.socialType;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
