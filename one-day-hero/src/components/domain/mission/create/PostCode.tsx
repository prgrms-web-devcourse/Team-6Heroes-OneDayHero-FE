"use client";

import { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

import Input from "@/components/common/Input";
import { useToast } from "@/contexts/ToastProvider";
import useModal from "@/hooks/useModal";
import { LocationType } from "@/types";

type PostCodeProps = {
  errorMessage?: string;
  defaultLocation?: LocationType;
  onChange: (location: LocationType) => void;
};

const PostCode = ({
  errorMessage,
  onChange,
  defaultLocation
}: PostCodeProps) => {
  const [address, setAddress] = useState<string>(
    defaultLocation?.regionName ?? ""
  );
  const [location, setLocation] = useState<LocationType | null>(
    defaultLocation ?? null
  );
  const { isOpen, onOpen, onClose } = useModal();

  const { showToast } = useToast();

  const handleComplete = async (data: { roadAddress: string }) => {
    const { roadAddress } = data;

    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${roadAddress}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_KEY}`
        }
      }
    );

    if (!response.ok) {
      showToast("위치 정보를 찾을 수 없어요", "error");
      throw new Error("위치를 제대로 입력해주세요.");
    }
    const res = await response.json();

    setLocation({
      lat: res.documents[0].y,
      lng: res.documents[0].x,
      regionName: res.documents[0].address.region_3depth_h_name
    });
    setAddress(roadAddress);
    onClose();
  };

  useEffect(() => {
    if (location === null) return;
    onChange(location);
  }, [location, onChange]);

  const handleClick = () => {
    onOpen();
  };

  return (
    <div className="flex w-full gap-2 ">
      <Input
        className="grow"
        readOnly
        readOnlyValue={address}
        error={errorMessage}
      />
      <button
        type="button"
        onClick={handleClick}
        className=" border-inactive focus:outline-primary h-[2.125rem] w-3/12 rounded-[0.625rem] border text-center">
        주소 검색
      </button>
      {isOpen && (
        <div className="flex items-center justify-center">
          <div
            className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-60"
            onClick={onClose}
          />
          <div className="rouded-md absolute bottom-20 left-1/2 z-20 w-10/12 translate-x-[-50%] bg-white">
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCode;
