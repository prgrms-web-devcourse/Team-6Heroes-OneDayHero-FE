"use client";

import Link from "next/link";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { PiWaveSineBold } from "react-icons/pi";

import Button from "@/components/common/Button";
import DayList from "@/components/common/DayList";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import InputLabel from "@/components/common/InputLabel";
import Label from "@/components/common/Label";
import Select from "@/components/common/Select";

const OptionalSurvey = () => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <>
      <form className="flex w-full max-w-screen-sm flex-col space-y-12">
        <div>
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1">
            희망 근무일
          </InputLabel>
          <DayList />
        </div>
        <div>
          <InputLabel
            htmlFor="working hour"
            className="cs:text-xl cs:ml-1 cs:mb-1">
            희망 근무시간
          </InputLabel>
          <div className="mt-1 flex gap-2">
            <Select id="working hour">
              {hours.map((hour) => (
                <option className="text-xs" key={hour}>
                  {hour}:00
                </option>
              ))}
            </Select>
            <span className="text-bold my-auto">
              <PiWaveSineBold />
            </span>
            <Select id="working hour">
              {hours.map((hour) => (
                <option className="text-xs" key={hour}>
                  {hour}:00
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <InputLabel
            htmlFor="favorite region"
            className="cs:text-xl cs:ml-1 cs:mb-1">
            선호지역(최대 5개)
          </InputLabel>
          <div className="mt-1 flex gap-2">
            <Select id="favorite region">
              {["마포구", "땡땡구"].map((gu) => (
                <option className="text-xs" key={gu}>
                  {gu}
                </option>
              ))}
            </Select>
            <span className="text-bold my-auto">
              <PiWaveSineBold />
            </span>
            <Select id="favorite region">
              {["동교동", "땡땡동"].map((dong) => (
                <option className="text-xs" key={dong}>
                  {dong}
                </option>
              ))}
            </Select>
            <Button
              theme="primary"
              className="h-9 w-9 rounded-xl px-3 text-white">
              <AiOutlinePlus className="pr-4 text-3xl" />
            </Button>
          </div>
          <HorizontalScroll className="cs:mt-2">
            {[
              "마포구 동교동",
              "땡땡구 땡땡동",
              "와와구 와와동",
              "이러구 저러동",
              "마포구 동교동",
              "땡땡구 땡땡동",
              "와와구 와와동",
              "이러구 저러동"
            ].map((region) => (
              <Label key={region} size="md" className="cs:min-w-fit cs:mr-2">
                {region}
                <AiOutlineClose className="ml-1" />
              </Label>
            ))}
          </HorizontalScroll>
        </div>
        <div className="bg-cancel-lighten h-56 w-full rounded-2xl">
          지도자리
        </div>
        <div className="flex w-full">
          <Link href="/survey/optional" className="cs:grow">
            <Button theme="cancel" size="md">
              건너뛰기
            </Button>
          </Link>
          <Link href="/survey/optional" className="cs:grow">
            <Button size="md" className="cs:w-full">
              다음
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default OptionalSurvey;
