import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
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
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.AUTH_URL}&response_type=code`}>
          <Image
            src="/images/kakaoLogin 1.png"
            alt="카카오 로그인"
            width={300}
            height={60}
          />
        </Link>
        <Link href="/">
          <h3 className="text-base text-inactive-darken underline underline-offset-4">
            비회원으로 둘러보기
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
