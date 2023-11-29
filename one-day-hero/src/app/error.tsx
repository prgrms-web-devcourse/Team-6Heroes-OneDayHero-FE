"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ErrorImage from "/public/images/error.jpg";
import Button from "@/components/common/Button";

export default function ErrorPage({
  error,
  reset
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    if (reset) reset();
    else {
      router.refresh();
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="mb-20 mt-6 text-xl font-semibold">
        데이터 처리 중 오류가 발생했어요!
      </h2>
      <Image src={ErrorImage} alt="에러 이미지" height={250} />
      <Button onClick={handleReset}>새로 고침</Button>
    </div>
  );
}
