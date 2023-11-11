"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <h2>Something went wrong!</h2>
      <Button onClick={handleReset}>Try again</Button>
    </div>
  );
}
