"use client";

import { FormEvent, useRef, useState } from "react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import UploadImage from "@/components/common/UploadImage";
import Textarea from "@/components/domain/mission/create/Textarea";

import InputLabel from "../../mission/create/InputLabel";
import StarRating from "./StarRating";

const ReviewForm = () => {
  const [score, setScore] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const handleScoreSelect = (count: number) => {
    setScore(count);
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(score);
    console.log(reviewRef.current?.value ?? "");
    console.log(selectedImages);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-5"
      onSubmit={handleSubmit}>
      <Container className="cs:w-full cs:py-8 cs:m-0 flex flex-col items-center gap-8">
        <h1 className="text-xl font-semibold">
          `유저이름` 님과의 미션은 어떠셨나요?
        </h1>
        <StarRating onSelect={handleScoreSelect} />
      </Container>
      <div className="w-full">
        <Textarea ref={reviewRef} className="cs:w-full cs:h-40" />
      </div>
      <div className="mb-5 flex w-full flex-col justify-start">
        <InputLabel>
          사진 <span className="text-inactive text-xs">(최대 3개)</span>
        </InputLabel>
        <UploadImage onFileSelect={handleFileSelect} />
      </div>
      <Button type="submit">제출하기</Button>
    </form>
  );
};

export default ReviewForm;
