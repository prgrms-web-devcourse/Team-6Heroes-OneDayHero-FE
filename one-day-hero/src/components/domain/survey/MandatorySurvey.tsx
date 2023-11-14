"use client";

import Link from "next/link";
import { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import InputLabel from "@/components/common/InputLabel";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";
import { ImageFileType } from "@/types";

const MandatorySurvey = () => {
  const [selectedImages, setSelectedImages] = useState<ImageFileType[] | null>(
    null
  );

  const handleFileSelect = (files: ImageFileType[]) => {
    setSelectedImages(files);
  };

  return (
    <>
      <form className="flex w-full max-w-screen-sm flex-col space-y-6">
        <div>
          <InputLabel className="cs:text-xl cs:ml-1" required>
            프로필 사진
          </InputLabel>
          <UploadImage size="lg" onFileSelect={handleFileSelect} />
        </div>
        <div>
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1" required>
            닉네임
          </InputLabel>
          <Input />
        </div>
        <div>
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1" required>
            자기소개
          </InputLabel>
          <Textarea className="cs:w-full cs:h-60 cs:max-w-screen-sm cs:mb-4" />
        </div>
        <Link href="/survey/optional" className="flex justify-center">
          <Button size="lg">다음</Button>
        </Link>
      </form>
    </>
  );
};

export default MandatorySurvey;
