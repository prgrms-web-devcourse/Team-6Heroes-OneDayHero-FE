"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const KakaoCallbackPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    /** @note 사용자가 로그인되어 있으면 홈페이지로 리다이렉트 */
    if (session) {
      window.location.href = "/";
    } else {
      /** @note 사용자가 로그인되어 있지 않으면 Kakao OAuth 로그인을 시작 */
      signIn("kakao");
    }
  }, [session]);

  return <div>Processing...</div>;
};

export default KakaoCallbackPage;
