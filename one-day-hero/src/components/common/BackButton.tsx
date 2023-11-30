"use client";

import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

const BackButton = () => {
  const router = useRouter();

  return (
    <BsChevronLeft className="cursor-pointer" onClick={() => router.back()} />
  );
};

export default BackButton;
