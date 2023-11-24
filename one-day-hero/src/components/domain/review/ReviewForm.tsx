"use client";

import { FormEvent, useRef, useState } from "react";

import Container from "@/components/common/Container";
import InputLabel from "@/components/common/InputLabel";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";
import { usePostCreateReviewFetch } from "@/services/review";
import { ImageFileType } from "@/types";

import StarRating from "./StarRating";

type ReviewFormProps = {
  editMode?: boolean;
  /** @note 수정 페이지 ? 데이터가 있으면 그 데이터를 채워서 보여줌 */
};

const ReviewForm = ({ editMode }: ReviewFormProps) => {
  const [score, setScore] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<ImageFileType[] | null>(
    null
  );
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutationalFetch } = usePostCreateReviewFetch();

  const handleScoreSelect = (count: number) => {
    setScore(count);
  };

  const handleFileSelect = (files: ImageFileType[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!editMode) {
      const formData = new FormData();

      const data = {
        senderId: 1,
        receiverId: 2,
        missionId: 1,
        categoryId: 1,
        missionTitle: "서빙 구함",
        content: reviewRef.current?.value ?? "",
        starScore: score
      };

      const jsonData = JSON.stringify(data);

      formData.append(
        "reviewCreateRequest",
        new Blob([jsonData], { type: "application/json" })
      );

      if (selectedImages) {
        selectedImages.forEach((image) => {
          const imageBlob = new Blob([image.file], { type: "image/jpeg" });
          formData.append("images", imageBlob);
        });
      }

      await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/createReview`, {
        method: "POST",
        body: formData
      });
    } else {
      /** @note true면 수정 폼으로 사용 put 요청 */
    }
  };

  return (
    <form
      id={!editMode ? "createReview" : "editReview"}
      className="flex w-full flex-col items-center gap-5"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
      <Container className="cs:w-full cs:py-8 cs:m-0 flex flex-col items-center gap-8 text-center">
        <h1 className="text-lg font-medium">
          `Nick` 히어로님과의 미션은 어떠셨나요?
        </h1>
        <StarRating onSelect={handleScoreSelect} />
      </Container>
      <div className="w-full">
        <InputLabel className="cs:text-lg">미션 후기를 남겨주세요.</InputLabel>
        <Textarea
          ref={reviewRef}
          className="cs:w-full cs:h-40 cs:shadow-down cs:border-0"
        />
      </div>
      <div className="mb-5 flex w-full flex-col justify-start">
        <InputLabel className="cs:text-base">
          사진 <span className="text-inactive text-sm">(최대 3개)</span>
        </InputLabel>
        <UploadImage onFileSelect={handleFileSelect} />
      </div>
    </form>
  );
};

export default ReviewForm;
