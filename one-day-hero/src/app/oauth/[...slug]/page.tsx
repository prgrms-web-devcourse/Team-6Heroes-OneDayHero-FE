"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const router = useRouter();

  useEffect(() => {
    if (!code) return;

    const postCode = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/token`, {
        method: "POST",
        body: JSON.stringify({
          code
        })
      });

      router.push("/");
    };

    postCode();
  }, [code, router]);

  return <div>Processing...</div>;
};

export default KakaoCallbackPage;
