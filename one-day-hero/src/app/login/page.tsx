"use client";

// eslint-disable-next-line simple-import-sort/imports
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session);

  const handleKakaoLogin = async () => {
    signIn("kakao");
  };

  return (
    <div>
      <Image
        src="/images/히어로 1.png"
        alt="원데이 히어로 마스코트"
        width={335}
        height={335}
        priority
      />
      <div className="flex flex-col items-center justify-center space-y-20">
        <h1 className="text-5xl font-black">원데이 히어로</h1>
        <button onClick={handleKakaoLogin}>
          <Image
            src="/images/kakaoLogin 1.png"
            alt="카카오 로그인"
            width={300}
            height={60}
          />
        </button>
        <Link href="/">
          <h3 className="text-inactive-darken text-base underline underline-offset-4">
            비회원으로 둘러보기
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
