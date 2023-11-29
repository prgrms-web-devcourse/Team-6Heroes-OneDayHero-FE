"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useToast } from "@/contexts/ToastProvider";
import { useUserId } from "@/contexts/UserIdProvider";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const router = useRouter();

  const { setUserId } = useUserId();

  const { showToast } = useToast();

  useEffect(() => {
    if (!code) return;

    const postCode = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FE_URL}/api/token`,
          {
            method: "POST",
            body: JSON.stringify({
              code
            })
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const userId = (await response.json()).userId;
        setUserId(userId);

        showToast("로그인 성공!", "success");

        if (response.status === 200) {
          router.push("/");
        } else if (response.status === 201) {
          router.push("/survey/mandatory");
        }
      } catch (err) {
        console.error(err);

        showToast(
          "로그인 처리 중 에러가 발생했습니다. 다시 시도해주세요.",
          "error"
        );
        router.push("/login");
      }
    };

    postCode();
  }, []);

  return <div className="text-bold text-2xl">Loading...</div>;
};

export default KakaoCallbackPage;
