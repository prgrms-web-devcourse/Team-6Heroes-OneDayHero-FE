"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { z } from "zod";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import ErrorMessage from "@/components/common/ErrorMessage";
import InputLabel from "@/components/common/InputLabel";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";
import { useToast } from "@/contexts/ToastProvider";
import { useUserId } from "@/contexts/UserIdProvider";
import { useDeleteReviewImageFetch } from "@/services/review";
import { ImageFileType } from "@/types";
import { ReviewDetailResponse } from "@/types/response";
import { ReviewFormSchema } from "@/types/schema";

import StarRating from "./StarRating";

type RequestType = z.infer<typeof ReviewFormSchema>;

type ReviewFormProps = {
  receiverNickname: string;
  receiverId?: number;
  missionId?: number;
  missionTitle?: string;
  categoryId?: number;
  editDefaultData?: {
    content: string;
    starScore: 1 | 2 | 3 | 4 | 5;
    imageDatas: ReviewDetailResponse["data"]["reviewImageResponses"];
    reviewId: number;
  };
};

const ReviewForm = ({
  receiverNickname,
  receiverId,
  missionId,
  missionTitle,
  categoryId,
  editDefaultData
}: ReviewFormProps) => {
  const { userId } = useUserId();

  const [score, setScore] = useState<number>(editDefaultData?.starScore ?? 0);
  const [selectedImages, setSelectedImages] = useState<ImageFileType[] | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof RequestType, string>>
  >({});

  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const { showToast } = useToast();
  const router = useRouter();

  const { mutationalFetch: deleteImageFetch } = useDeleteReviewImageFetch();

  const handleScoreSelect = (count: number) => {
    setScore(count);
  };

  const handleFileSelect = (files: ImageFileType[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data: RequestType = {
      senderId: !editDefaultData ? userId : undefined,
      receiverId,
      missionId,
      categoryId,
      missionTitle,
      content: reviewRef.current?.value ?? "",
      starScore: score
    };

    const result = ReviewFormSchema.safeParse(data);

    if (!result.success) {
      const validationError: Record<string, string> = {};
      result.error.errors.map((err) => {
        validationError[err.path.join()] = err.message;
      });

      setErrorMessage(validationError);
      return;
    }

    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    formData.append(
      editDefaultData ? "reviewUpdateRequest" : "reviewCreateRequest",
      new Blob([jsonData], { type: "application/json" })
    );

    if (selectedImages) {
      selectedImages.forEach((image) => {
        const imageBlob = new Blob([image.file], { type: "image/jpeg" });
        formData.append(`images`, imageBlob, "image.jpg");
      });
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/${
          editDefaultData
            ? `editReview/${editDefaultData.reviewId}`
            : "createReview"
        }`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        const data = await response.json();

        const errorCode = data?.code;
        const errorMessage = data?.message;

        showToast(errorMessage, "error");
        return;
      }

      const reviewId = (await response.json()).data.id;

      showToast(
        `리뷰가 ${editDefaultData ? "수정" : "생성"}되었습니다!`,
        "success"
      );
      router.replace(`/review/${reviewId}`);
    } catch (err) {
      showToast(
        `리뷰 ${
          editDefaultData ? "수정" : "생성"
        } 중 오류가 발생했어요. 다시 시도해주세요`,
        "error"
      );
    }
  };

  return (
    <form
      id={!editDefaultData ? "createReview" : "editReview"}
      className="flex w-full flex-col items-center gap-5"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
      <Container className="cs:m-0 cs:w-full cs:py-8 flex flex-col items-center gap-8 text-center">
        <h1 className="text-lg font-medium">
          &quot;{receiverNickname}&quot; 님과의 미션은 어떠셨나요?
        </h1>
        <StarRating
          onSelect={handleScoreSelect}
          value={editDefaultData?.starScore}
        />
        {errorMessage.starScore && (
          <ErrorMessage>{errorMessage.starScore}</ErrorMessage>
        )}
      </Container>
      <div className="w-full">
        <InputLabel className="cs:text-lg">미션 후기를 남겨주세요.</InputLabel>
        <Textarea
          ref={reviewRef}
          className="cs:h-40 cs:w-full cs:border-0 cs:shadow-down"
          error={errorMessage.content}
          value={editDefaultData?.content}
        />
      </div>
      <div className="mb-5 flex w-full flex-col justify-start">
        <InputLabel className="cs:text-base">
          사진 <span className="text-inactive text-sm">(최대 3개)</span>
        </InputLabel>
        <UploadImage
          onFileSelect={handleFileSelect}
          defaultImages={editDefaultData?.imageDatas}
          deleteImageFetch={deleteImageFetch}
        />
      </div>
      <Button type="submit" className="cs:mt-3">
        제출하기
      </Button>
    </form>
  );
};

export default ReviewForm;
