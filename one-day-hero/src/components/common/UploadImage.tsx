"use client";

import Image from "next/image";
import { ChangeEvent, PropsWithChildren, useRef, useState } from "react";
import { BiCamera, BiX } from "react-icons/bi";

import HorizontalScroll from "./HorizontalScroll";

interface UploadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "md" | "lg";
}

const UploadImage = ({
  size = "md",
  className = "",
  ...props
}: PropsWithChildren<UploadImageProps>) => {
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    inputRef?.current?.click();
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (size === "md") {
        if (
          event.target.files.length > 3 ||
          (selectedImages && selectedImages.length >= 3)
        ) {
          alert("사진은 최대 3장입니다.");
          return;
        }
        const newFile = Array.from(event.target.files);
        setSelectedImages((prev) =>
          prev ? [...prev, ...newFile] : [...newFile]
        );
      } else {
        const newFile = Array.from(event.target.files);
        setSelectedImages(newFile);
      }
    }
  };

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
            {size === "md" && (
              <p className="text-base">{selectedImages?.length ?? "0"} / 3</p>
            )}
          </div>
        </div>
        {selectedImages &&
          selectedImages.map((image) => (
            <div
              key={image.name}
              onClick={size === "lg" ? handleUpload : undefined}
              className={`${imageSizes[size]} shrink-0 overflow-hidden`}>
              <BiX
                className="absolute right-3 top-3 z-10 flex text-black"
                onClick={handleDelete}
              />
              <Image
                src={URL.createObjectURL(image)}
                alt="올린 이미지"
                fill
                className="bg-cover"
              />
            </div>
          ))}
      </div>
    </HorizontalScroll>
  );
};

export default UploadImage;
