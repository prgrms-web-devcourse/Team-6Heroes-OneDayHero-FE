"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { z } from "zod";

import { formatTime } from "@/app/utils/formatTime";
import Category from "@/components/common/Category";
import Container from "@/components/common/Container";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import InputLabel from "@/components/common/InputLabel";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";
import { useToast } from "@/contexts/ToastProvider";
import { ImageFileType, LocationType } from "@/types";
import { MissionCreateRequest } from "@/types/request";
import { MissionResponse } from "@/types/response";
import { MissionFormSchema } from "@/types/schema";

import CustomCalendar from "./CustomCalendar";
import PostCode from "./PostCode";

const hours = Array.from({ length: 24 }, (_, index) => index);

type MissionRequestType = z.infer<typeof MissionFormSchema>;

type CreateFormProps = {
  editDefaultData?: {
    id: number;
    latitude: number;
    longitude: number;
    missionCategeryId: number;
    missionImage: MissionResponse["data"]["missionImage"];
    missionInfo: MissionResponse["data"]["missionInfo"];
    region: MissionResponse["data"]["region"];
  };
};

type FormattedErrors = {
  [key: string]: string | { [key: string]: string };
};

const MissionForm = ({ editDefaultData }: CreateFormProps) => {
  const [categoryId, setCategoryId] = useState<number>(
    editDefaultData?.missionCategeryId ?? 0
  );
  const [selectedImages, setSelectedImages] = useState<ImageFileType[] | null>(
    null
  );
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MissionRequestType, string>>
  >({});
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<HTMLSelectElement | null>(null);
  const endRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const { showToast } = useToast();
  const router = useRouter();

  const handleSelect = (id: number) => {
    setCategoryId(id);
  };

  const handleFileSelect = (files: ImageFileType[]) => {
    setSelectedImages(files);
  };

  const handleOnChage = (location: LocationType) => {
    setLocation(location);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const deadline =
      (dateRef.current?.value ?? "") + " " + (startRef.current?.value ?? "");

    const deadlineTime = formatTime(deadline);

    const data: MissionCreateRequest = {
      missionCategoryId: categoryId,
      regionName: location?.resionName ?? "",
      latitude: Number(location?.lat) ?? 0,
      longitude: Number(location?.lng) ?? 0,
      missionInfo: {
        title: titleRef.current?.value ?? "",
        content: contentRef.current?.value ?? "",
        missionDate: dateRef.current?.value ?? "",
        startTime: startRef.current?.value ?? "",
        endTime: endRef.current?.value ?? "",
        deadlineTime: deadlineTime ?? "",
        price: parseInt(priceRef.current?.value?.trim() ?? "0")
      }
    };

    const result = MissionFormSchema.safeParse(data);

    if (!result.success) {
      const validationError: Record<string, string> = {};

      result.error.errors.map((err) => {
        validationError[err.path.join(".")] = err.message;
      });

      console.log(validationError);

      const formattedErrors: FormattedErrors = {};

      for (const key in validationError) {
        const parts = key.split(".");

        if (parts.length > 1) {
          if (!formattedErrors[parts[0]]) {
            formattedErrors[parts[0]] = {};
          }
          (formattedErrors[parts[0] as string] as { [key: string]: string })[
            parts.slice(1).join(".")
          ] = validationError[key];
        } else {
          formattedErrors[key] = validationError[key];
        }
      }

      setErrors(formattedErrors);
      return;
    }

    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    formData.append(
      editDefaultData ? "missionUpdateRequest" : "missionCreateRequest",
      new Blob([jsonData], { type: "application/json" })
    );

    if (selectedImages) {
      selectedImages?.forEach((image: ImageFileType) => {
        const imageBlob = new Blob([image.file], { type: "image/jpeg" });
        formData.append(`multipartFiles`, imageBlob, "image.jpg");
      });
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/${
          editDefaultData
            ? `editMission/${editDefaultData.id}`
            : "createMission"
        }`,
        {
          method: "POST",
          body: formData
        }
      );

      console.log(response);

      const missionId = (await response.json()).data.id;

      showToast(
        `미션 ${editDefaultData ? "수정" : "생성"}이 완료되었습니다`,
        "success"
      );

      router.push(`/mission/${missionId}`);
    } catch (error) {
      showToast(
        `미션 ${
          editDefaultData ? "수정" : "생성"
        } 중 오류가 발생했어요. 다시 시도해주세요`,
        "error"
      );
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit}
      id={editDefaultData ? "missionEditForm" : "missionCreateForm"}>
      <Container className="cs:flex cs:w-full cs:flex-col cs:gap-3 cs:p-5">
        <span className="text-base font-semibold">
          찾는 카테고리가 있으신가요?
        </span>
        <Category
          onSelect={handleSelect}
          error={errors?.missionCategoryId}
          value={editDefaultData?.missionCategeryId}
        />
      </Container>
      <Container className="cs:flex cs:w-full cs:flex-col cs:gap-5 cs:p-5">
        <div className="flex flex-col">
          <span className="mb-4 text-base font-semibold">
            미션에 대한 정보를 알려주세요!
          </span>
          <InputLabel htmlFor="title" required>
            제목
          </InputLabel>
          <Input
            id="title"
            ref={titleRef}
            value={editDefaultData?.missionInfo.title}
            error={errors?.missionInfo?.title}
            placeholder="미션 제목을 입력하세요."
          />
        </div>
        <div>
          <InputLabel>
            사진 <span className="text-inactive text-xs">(최대 3개)</span>
          </InputLabel>
          <UploadImage
            onFileSelect={handleFileSelect}
            defaultImages={editDefaultData?.missionImage}
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="missionDate" required>
            날짜
          </InputLabel>
          <CustomCalendar
            id="missionDate"
            ref={dateRef}
            defaultValue={editDefaultData?.missionInfo.missionDate}
            error={errors?.missionInfo?.missionDate}
          />
        </div>
        <div>
          <InputLabel htmlFor="startTime" required>
            시간
          </InputLabel>
          <div className="mt-1 flex gap-4">
            <Select
              id="startTime"
              ref={startRef}
              value={editDefaultData?.missionInfo.startTime}
              error={errors?.missionInfo?.startTime}>
              {hours.map((hour) => (
                <option key={hour}>{String(hour).padStart(2, "0")}:00</option>
              ))}
            </Select>
            <span>~</span>
            <Select
              id="endTime"
              ref={endRef}
              value={editDefaultData?.missionInfo.endTime}
              error={errors?.missionInfo?.endTime}>
              {hours.map((hour) => (
                <option key={hour}>{String(hour).padStart(2, "0")}:00</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="price" required>
            포상금
          </InputLabel>
          <Input
            id="price"
            ref={priceRef}
            value={editDefaultData?.missionInfo.price}
            type="number"
            className="w-6/12"
            error={errors?.missionInfo?.price}
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="content" required>
            미션 내용
          </InputLabel>
          <Textarea
            id="content"
            ref={contentRef}
            value={editDefaultData?.missionInfo.content}
            placeholder="미션 내용이나 비고를 작성해주세요!"
            error={errors?.missionInfo?.content}
          />
        </div>
        <div>
          <InputLabel htmlFor="address" required>
            미션 위치
          </InputLabel>
          <div className="mb-1 flex w-full gap-3">
            <PostCode
              onChange={handleOnChage}
              {...(editDefaultData && {
                defaultLocation: {
                  lat: editDefaultData.latitude ?? 0,
                  lng: editDefaultData.longitude ?? 0,
                  resionName: `${editDefaultData.region.dong}`
                }
              })}
            />
          </div>
          {errors.regionName && (
            <ErrorMessage>{errors.regionName}</ErrorMessage>
          )}
        </div>
      </Container>
    </form>
  );
};

export default MissionForm;
