"use client"; // Error components must be Client Components

import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    if (reset) reset();
    else {
      revalidatePath(pathname);
      router.refresh();
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h2>Something went wrong!</h2>
      <button onClick={handleReset}>Try again</button>
    </div>
  );
}
