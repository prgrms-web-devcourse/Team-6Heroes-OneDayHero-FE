"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import UploadImage from "@/components/common/UploadImage";
import { ImageFileType } from "@/types";
import {
  MandatorySurveySchema,
  MandatorySurveySchemaProps
} from "@/types/schema";

const MandatorySurvey = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue
  } = useForm<MandatorySurveySchemaProps>({
    resolver: zodResolver(MandatorySurveySchema)
  });

  const onSubmit = () => {
    if (errors) {
      router.push("/survey/mandatory");
    }

    router.push("/survey/optional");
  };

  const handleFileSelect = useCallback(
    (file: ImageFileType[]) => {
      clearErrors("image");
      setValue("image", {
        id: uuidv4(),
        file
      });
    },
    [clearErrors, setValue]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-8 flex w-full max-w-screen-sm flex-col gap-7">
        <div>
          <InputLabel className="cs:ml-3 cs:text-xl" required>
            프로필 사진
          </InputLabel>
          <UploadImage
            {...register("image")}
            size="lg"
            onFileSelect={handleFileSelect}
          />
          {errors.image && (
            <p className="text-red-500">{`${errors.image.message}`}</p>
          )}
        </div>

        <div>
          <InputLabel className="cs:mb-1 cs:ml-1 cs:text-xl" required>
            닉네임
          </InputLabel>
          <input
            {...register("nickName")}
            className="h-11 w-full rounded-[10px] border border-inactive p-4 pl-3 placeholder:text-inactive focus:outline-primary"
          />
          {errors.nickName && (
            <p className="text-red-500">{`${errors.nickName.message}`}</p>
          )}
        </div>

        <div>
          <InputLabel className="cs:mb-1 cs:ml-1 cs:text-xl" required>
            자기소개
          </InputLabel>
          <textarea
            {...register("introduction")}
            className="h-40 w-full max-w-screen-sm resize-none rounded-2xl border border-inactive p-4 focus:outline-primary"
          />
          {errors.introduction && (
            <p className="text-red-500">{`${errors.introduction.message}`}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cs:mx-auto cs:mt-24"
          size="lg">
          다음
        </Button>
      </form>
    </>
  );
};

export default MandatorySurvey;
