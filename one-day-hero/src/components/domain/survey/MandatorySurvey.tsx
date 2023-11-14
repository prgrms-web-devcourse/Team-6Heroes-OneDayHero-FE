"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import UploadImage from "@/components/common/UploadImage";
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

  const onSubmit = async () => {
    router.push("/survey/optional");
  };

  const handleFileSelect = useCallback(
    (file: File[]) => {
      clearErrors("image");
      setValue("image", file);
    },
    [clearErrors, setValue]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-8 flex w-full max-w-screen-sm flex-col gap-7">
        <div>
          <InputLabel className="cs:text-xl cs:ml-3" required>
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
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1" required>
            닉네임
          </InputLabel>
          <input
            {...register("nickName")}
            className="border-inactive focus:outline-primary placeholder:text-inactive h-11 w-full rounded-[10px] border p-4 pl-3"
          />
          {errors.nickName && (
            <p className="text-red-500">{`${errors.nickName.message}`}</p>
          )}
        </div>

        <div>
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1" required>
            자기소개
          </InputLabel>
          <textarea
            {...register("introduction")}
            className="border-inactive focus:outline-primary h-40 w-full max-w-screen-sm resize-none rounded-2xl border p-4"
          />
          {errors.introduction && (
            <p className="text-red-500">{`${errors.introduction.message}`}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cs:mt-24 cs:mx-auto"
          size="lg">
          다음
        </Button>
      </form>
    </>
  );
};

export default MandatorySurvey;
