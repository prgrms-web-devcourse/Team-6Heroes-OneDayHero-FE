"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { formatTime } from "@/app/utils/formatTime";
import Category from "@/components/common/Category";
import Container from "@/components/common/Container";
import Input from "@/components/common/Input";
import InputLabel from "@/components/common/InputLabel";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import UploadImage from "@/components/common/UploadImage";
import useFormValidation, { FormErrors } from "@/hooks/useFormValidation";
import { apiUrl } from "@/services/base";
import { useCreateMissionFetch } from "@/services/missions";
import { ImageFileType } from "@/types";
import { MissionCreateRequest } from "@/types/request";

import CustomCalendar from "./CustomCalendar";

const hours = Array.from({ length: 24 }, (_, index) => index);

const CreateForm = () => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<ImageFileType[] | null>(
    null
  );
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<HTMLSelectElement | null>(null);
  const endRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { missionCreateValidation } = useFormValidation();

  const { mutationalFetch } = useCreateMissionFetch();

  const token = getClientToken();

  const router = useRouter();

  const handleSelect = (id: number) => {
    setCategoryId(id);
  };

  const handleFileSelect = (files: ImageFileType[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const deadline =
      (dateRef.current?.value ?? "") + " " + (startRef.current?.value ?? "");

    const deadlineTime = formatTime(deadline);

    const formData = new FormData();

    const data: MissionCreateRequest = {
      missionCategoryId: categoryId,
      regionId: 1,
      latitude: 123.45,
      longitude: 123.45,
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

    const jsonData = JSON.stringify(data);

    formData.append(
      "missionCreateRequest",
      new Blob([jsonData], { type: "application/json" })
    );

    if (selectedImages) {
      selectedImages?.forEach((image) => {
        const imageBlob = new Blob([image.file], { type: "image/jpeg" });
        formData.append(`multipartFiles`, imageBlob, "image.jpg");
      });
    }

    const validationErrors = missionCreateValidation(data);
    setErrors(validationErrors);

    if (!Object.keys(validationErrors).length) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/createPost`,
        {
          method: "POST",
          body: JSON.stringify({ data, images: selectedImages })
        }
      );
      // const { response, errorMessage } = await mutationalFetch({
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      console.log(response.status);

      // if (response) router.push(`/mission/${response.data.id}`);
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit}
      id="missionCreateForm">
      <Container className="cs:flex cs:w-full cs:flex-col cs:gap-3 cs:p-5">
        <span className="text-base font-semibold">
          찾는 카테고리가 있으신가요?
        </span>
        <Category onSelect={handleSelect} error={errors?.missionCategoryId} />
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
            error={errors?.missionInfo?.title}
            placeholder="미션 제목을 입력하세요."
          />
        </div>
        <div>
          <InputLabel>
            사진 <span className="text-xs text-inactive">(최대 3개)</span>
          </InputLabel>
          <UploadImage onFileSelect={handleFileSelect} />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="missionDate" required>
            날짜
          </InputLabel>
          <CustomCalendar
            id="missionDate"
            ref={dateRef}
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
              error={errors?.missionInfo?.startTime}>
              {hours.map((hour) => (
                <option key={hour}>{String(hour).padStart(2, "0")}:00</option>
              ))}
            </Select>
            <span>~</span>
            <Select
              id="endTime"
              ref={endRef}
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
            placeholder="미션 내용이나 비고를 작성해주세요!"
            error={errors?.missionInfo?.content}
          />
        </div>
      </Container>
    </form>
  );
};

export default CreateForm;
