"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import UploadImage from "@/components/common/UploadImage";
import { ImageFileType } from "@/types";
import { UserResponse } from "@/types/response";
import {
  MandatorySurveySchema,
  MandatorySurveySchemaProps
} from "@/types/schema";

const MandatorySurvey = forwardRef((userData: UserResponse, ref) => {
  // const [image, setImage] = useState<ImageFileType[] | null>(null);

  const { basicInfo, favoriteRegions, favoriteWorkingDay } = userData.data;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<MandatorySurveySchemaProps>({
    resolver: zodResolver(MandatorySurveySchema)
  });

  const onSubmit: SubmitHandler<MandatorySurveySchemaProps> = async (data) => {
    const file = getValues("image");
    console.log("file", file);

    const userData: Omit<
      UserResponse["data"],
      "image" | "heroScore" | "isHeroMode" | "serverDateTime"
    > = {
      basicInfo: {
        nickname: data.nickName,
        gender: basicInfo.gender,
        birth: basicInfo.birth,
        introduce: data.introduction
      },
      favoriteWorkingDay: favoriteWorkingDay,
      favoriteRegions: favoriteRegions
    };

    const formData = new FormData();

    const jsonData = JSON.stringify(userData);
    const imageData = file;

    console.log("image", imageData);

    formData.append(
      "userUpdateRequest",
      new Blob([jsonData], { type: "application/json" })
    );

    if (imageData) {
      const imageBlob = new Blob([imageData[0].file], { type: "image/jpeg" });

      formData.append(`multipartFiles`, imageBlob, "image/jpeg");
    }

    fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/createMandatorySurvey`, {
      method: "POST",
      body: formData
    }).then(() => {
      router.push("/survey/optional");
    });
  };

  const handleFileSelect = useCallback(
    (file: ImageFileType[]) => {
      setValue("image", file);
    },
    [setValue]
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
