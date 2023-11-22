"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import UploadImage from "@/components/common/UploadImage";
import { useEditProfileFetch } from "@/services/users";
import { ImageFileType } from "@/types";
import {
  MandatorySurveySchema,
  MandatorySurveySchemaProps
} from "@/types/schema";

const MandatorySurvey = forwardRef(() => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue,
    getValues
  } = useForm<MandatorySurveySchemaProps>({
    resolver: zodResolver(MandatorySurveySchema)
  });

  const { mutationalFetch } = useEditProfileFetch();

  const onSubmit: SubmitHandler<MandatorySurveySchemaProps> = (data) => {
    console.log("data check", data);
    // mutationalFetch(
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       basicInfo: {
    //         nickname: data.nickName,
    //         introduce: data.introduction
    //       }
    //     })
    //   },
    //   () => {
    //     router.push("/survey/optional");
    //   }
    // );
  };

  const handleFileSelect = useCallback(
    (file: ImageFileType[]) => {
      setValue("image", file);
      clearErrors("image");
    },
    [setValue, getValues]
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
            className="border-inactive placeholder:text-inactive focus:outline-primary h-11 w-full rounded-[10px] border p-4 pl-3"
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
            className="border-inactive focus:outline-primary h-40 w-full max-w-screen-sm resize-none rounded-2xl border p-4"
          />
          {errors.introduction && (
            <p className="text-red-500">{`${errors.introduction.message}`}</p>
          )}
        </div>

        <Button type="submit" className="cs:mx-auto cs:mt-24" size="lg">
          다음
        </Button>
      </form>
    </>
  );
});

MandatorySurvey.displayName = "MandatorySurvey";

export default MandatorySurvey;
