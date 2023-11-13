"use client";

import { FormEvent, useRef, useState } from "react";

import Container from "@/components/common/Container";
import InputLabel from "@/components/common/InputLabel";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";

import StarRating from "./StarRating";

type ReviewFormProps = {
  editMode?: boolean;
  /** @note 수정 페이지 ? 데이터가 있으면 그 데이터를 채워서 보여줌 */
};

const ReviewForm = ({ editMode }: ReviewFormProps) => {
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
    if (!editMode) {
      console.log(score);
      console.log(selectedImages);
      /** @note 기본값으로는 생성 폼으로 사용 post 요청 */
    } else {
      /** @note true면 수정 폼으로 사용 put 요청 */
    }
  };

  return (
    <form
      id="createReview"
      className="flex w-full flex-col items-center gap-5"
      onSubmit={handleSubmit}>
      <Container className="cs:w-full cs:py-8 cs:m-0 flex flex-col items-center gap-8 text-center">
        <h1 className="text-xl font-semibold">
          `유저이름` 님과의 미션은 어떠셨나요?
        </h1>
        <StarRating onSelect={handleScoreSelect} />
      </Container>
      <div className="w-full">
        <Textarea
          ref={reviewRef}
          className="cs:w-full cs:h-40 cs:shadow-down cs:border-0"
        />
      </div>
      <div className="mb-5 flex w-full flex-col justify-start">
        <InputLabel>
          사진 <span className="text-inactive text-xs">(최대 3개)</span>
        </InputLabel>
        <UploadImage onFileSelect={handleFileSelect} />
      </div>
    </form>
  );
};

export default ReviewForm;
