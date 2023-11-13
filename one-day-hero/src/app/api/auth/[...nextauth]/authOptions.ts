import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: "secret"
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: "/"
  },
  callbacks: {
    async signIn() {
      /** @note 사용자가 로그인할 때 호출되는 콜백 */
      return true;
    },
    async redirect() {
      /** @note 로그인 후 리다이렉트될 경로를 지정하는 콜백 */
      return "/";
    },
    async session(session: any) {
      /** @note 세션을 설정하는 콜백 */
      return session;
    }
  }
};

export default authOptions;
