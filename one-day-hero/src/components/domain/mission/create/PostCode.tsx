"use client";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const PostCode = () => {
  const [address, setAddress] = useState<string>("");

  const handleComplete = (data) => {
    const { roadAddress } = data;

    setAddress(roadAddress);
  };

  return <DaumPostcodeEmbed onComplete={handleComplete} />;
};

export default PostCode;
