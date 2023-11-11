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
  callbacks: {}
};

export default authOptions;
