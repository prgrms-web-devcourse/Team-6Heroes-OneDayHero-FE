"use client";

import Image from "next/image";
import {
  ChangeEvent,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from "react";
import { BiCamera, BiX } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/contexts/ToastProvider";
import { CustomResponse } from "@/services/base";
import { ImageFileType } from "@/types";
import { EmptyResponse, ReviewDetailResponse } from "@/types/response";
import { getClientToken } from "@/utils/cookie";

import HorizontalScroll from "./HorizontalScroll";

interface UploadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "md" | "lg";
  // eslint-disable-next-line no-unused-vars
  onFileSelect: (files: ImageFileType[]) => void;
  maxImageLength?: number;
  defaultImages?: ReviewDetailResponse["data"]["reviewImageResponses"];
  deleteImageFetch?: (
    pathname: string,
    fetchOptions: RequestInit,
    onSuccess?: (response?: Response) => void,
    onError?: () => void
  ) => Promise<CustomResponse<EmptyResponse>>;
  pathname?: string;
}

const UploadImage = forwardRef(
  (
    {
      size = "md",
      className = "",
      onFileSelect,
      maxImageLength = 3,
      defaultImages,
      deleteImageFetch,
      pathname,
      ...props
    }: PropsWithChildren<UploadImageProps>,
    ref
  ) => {
    const token = getClientToken() ?? "";

    const [selectedImages, setSelectedImages] = useState<
      ImageFileType[] | null
    >(null);
    const [prevImages, setPrevImages] = useState<
      ReviewDetailResponse["data"]["reviewImageResponses"] | null
    >(defaultImages ?? null);

    const imagesLength =
      (prevImages?.length ?? 0) + (selectedImages?.length ?? 0);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const { showToast } = useToast();

    const defaultStyle =
      "bg-inactive text-white flex justify-center items-center shrink-0";

    const sizes = {
      md: "w-32 h-32 text-4xl rounded-[10px]",
      lg: "w-52 h-52 text-5xl relative rounded-2xl"
    };

    const imageSizes = {
      md: "w-32 h-32 relative duration-300 hover:scale-105 text-2xl rounded-[10px]",
      lg: "w-52 h-52 absolute overflow-hidden text-3xl rounded-2xl"
    };

    const handleUpload = () => {
      if (size === "md" && imagesLength >= maxImageLength) {
        showToast(`최대 ${maxImageLength}개까지 선택 가능합니다.`, "error");
        return;
      }

      inputRef?.current?.click();
    };

    const handleDelete = (id: string) => (e: MouseEvent) => {
      e.stopPropagation();
      const newFile = selectedImages?.filter((image) => image.id !== id);
      setSelectedImages(newFile ?? []);
    };

    const handlePrevDelete = (id: number) => async (e: MouseEvent) => {
      e.stopPropagation();

      if (!deleteImageFetch) return;

      const { isError } = await deleteImageFetch(`${pathname}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (isError) return;

      const newFile = prevImages?.filter((image) => image.id !== id);
      setPrevImages(newFile ?? []);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFile = Array.from(e.target.files).map((file) => ({
          id: uuidv4(),
          file
        }));

        setSelectedImages(
          size === "md"
            ? (prev) => (prev ? [...prev, ...newFile] : [...newFile])
            : newFile
        );
      }
    };

    useEffect(() => {
      selectedImages !== null && onFileSelect(selectedImages);
    }, [selectedImages, onFileSelect]);

    return (
      <HorizontalScroll>
        <div
          className={`flex w-full flex-nowrap overflow-auto ${
            size === "md" ? "flex-row gap-2" : ""
          }`}>
          <div
            className={`${defaultStyle} ${sizes[size]} ${className}`}
            {...props}
            onClick={handleUpload}>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              multiple={size === "md"}
            />
            <div className="flex flex-col items-center justify-center">
              <BiCamera />
              {size === "md" && <p className="text-base">{imagesLength} / 3</p>}
            </div>
          </div>
          {prevImages &&
            prevImages.map((image) => (
              <div
                key={image.id}
                onClick={size === "lg" ? handleUpload : undefined}
                className={`${imageSizes[size]} shrink-0 overflow-hidden`}>
                <BiX
                  size={size === "lg" ? 30 : 20}
                  className="absolute right-[6px] top-[6px] z-10 text-black"
                  onClick={handlePrevDelete(image.id)}
                />
                <Image
                  src={image.path}
                  alt="올린 이미지"
                  fill
                  className="bg-cover"
                />
              </div>
            ))}
          {selectedImages &&
            selectedImages.map((image) => (
              <div
                key={image.id}
                onClick={size === "lg" ? handleUpload : undefined}
                className={`${imageSizes[size]} shrink-0 overflow-hidden`}>
                <BiX
                  size={size === "lg" ? 30 : 20}
                  className="absolute right-[6px] top-[6px] z-10 text-black"
                  onClick={handleDelete(image.id)}
                />
                <Image
                  src={URL.createObjectURL(image.file)}
                  alt="올린 이미지"
                  fill
                  className="bg-cover"
                />
              </div>
            ))}
        </div>
      </HorizontalScroll>
    );
  }
);

UploadImage.displayName = "UploadImage";

export default UploadImage;
