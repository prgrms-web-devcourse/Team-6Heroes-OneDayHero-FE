"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import { getClientToken } from "@/app/utils/cookie";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import HeroScore from "@/components/common/HeroScore";
import { useGetHeroNicknameDetailListFetch } from "@/services/search";

const HeroSearchPage = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, setSearchParams } = useGetHeroNicknameDetailListFetch(
    token ?? "",
    observerRef
  );

  const searchHandler = useCallback(() => {
    if (inputValue === "") {
      setSearchParams("");
      return;
    }

    const encodingValue = encodeURI(inputValue!);

    setSearchParams(`nickname=${encodingValue}`);
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchHandler]);

  const InputDefaultStyle =
    "rounded-[0.65rem] h-11 w-full border border-inactive focus:outline-primary placeholder:text-inactive pl-3";

  return (
    <>
      <div
        className="fixed z-50 mt-[4.5rem] 
w-full max-w-screen-sm">
        <section className="flex justify-center border-b border-background-darken px-4 pb-6">
          <input
            className={InputDefaultStyle}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="히어로를 검색해 보세요."
          />
          <Button
            theme="primary"
            className="border-2 cs:ml-2 cs:h-11 cs:w-11 cs:rounded-xl cs:border-inactive cs:px-3">
            <FaSearch className="text-black" />
          </Button>
        </section>
      </div>

      <section className="mt-40 flex w-full max-w-screen-sm flex-col items-center justify-center gap-y-4">
        {data.length !== 0 ? (
          data.map(({ nickname, id, heroScore, image }) => (
            <Link href={`/heroProfile/${id}`} key={uuidv4()} className="w-full">
              <Container className="cs:mx-auto">
                <div className="mt-2 flex pr-2">
                  <Image
                    src={image.path ?? DefaultThumbnail}
                    alt="프로필 이미지"
                    width={60}
                    className="pointer-events-none mr-2 rounded-full"
                  />
                  <div className="grow">
                    <h3 className="text-base font-semibold">{nickname}</h3>
                    <HeroScore score={heroScore} size="sm" />
                  </div>
                </div>
              </Container>
            </Link>
          ))
        ) : (
          <div className="text-cancel-lighten">
            해당 히어로가 존재하지 않습니다.
          </div>
        )}
        <div ref={observerRef} />
      </section>
    </>
  );
};

export default HeroSearchPage;
