"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import UploadImage from "@/components/common/UploadImage";
import { useToast } from "@/contexts/ToastProvider";
import { useDeleteProfileImageFetch } from "@/services/survey";
import { ImageFileType } from "@/types";
import {
  UserInfoForOptionalSurveyResponse,
  UserResponse
} from "@/types/response";
import {
  MandatorySurveySchema,
  MandatorySurveySchemaProps
} from "@/types/schema";

const MandatorySurvey = forwardRef((userData: UserResponse, ref) => {
  const { basicInfo, favoriteRegions, favoriteWorkingDay, image } =
    userData.data;

  const defaultImage = image.path === null ? [] : [image];

  const { mutationalFetch: deleteImageFetch } = useDeleteProfileImageFetch();

  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
    watch
  } = useForm<MandatorySurveySchemaProps>({
    resolver: zodResolver(MandatorySurveySchema)
  });

  const imageWatch = watch("image");

  useEffect(() => {
    if (!errors.image) {
      clearErrors("image");
    } else {
      return;
    }
  }, [imageWatch]);

  const sortedFavoriteRegions = favoriteRegions?.map((item) => item.id) ?? [0];
  const vaildatedFavoriteWorkingDay = favoriteWorkingDay ?? {
    favoriteDate: [],
    favoriteStartTime: null,
    favoriteEndTime: null
  };

  const onSubmit: SubmitHandler<MandatorySurveySchemaProps> = async (data) => {
    const file = getValues("image");

    const userData: UserInfoForOptionalSurveyResponse = {
      basicInfo: {
        nickname: data.nickName,
        gender: basicInfo.gender,
        birth: basicInfo.birth,
        introduce: data.introduction
      },
      favoriteWorkingDay: vaildatedFavoriteWorkingDay,
      favoriteRegions: sortedFavoriteRegions
    };

    const formData = new FormData();

    const jsonData = JSON.stringify(userData);
    const imageData = file;

    formData.append(
      "userUpdateRequest",
      new Blob([jsonData], { type: "application/json" }),
      "json"
    );

    if (imageData) {
      const imageBlob = new Blob([imageData[0]?.file], { type: "image/jpeg" });

      formData.append("userImages", imageBlob, "image.jpeg");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/createMandatorySurvey`,
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

      router.push("/survey/optional");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSelect = useCallback(
    (file: ImageFileType[]) => {
      setValue("image", file);
      clearErrors("image");
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
            defaultImages={defaultImage}
            deleteImageFetch={deleteImageFetch}
          />
          {errors.image && (
            <p className="text-red-500">프로필 이미지를 업로드 해주세요.</p>
          )}
        </div>

        <div>
          <InputLabel className="cs:mb-1 cs:ml-1 cs:text-xl" required>
            닉네임
          </InputLabel>
          <input
            defaultValue={basicInfo.nickname}
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
            defaultValue={basicInfo.introduce}
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
