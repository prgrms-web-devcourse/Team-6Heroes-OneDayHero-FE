"use client";

import Link from "next/link";
import { ChangeEvent, RefObject, useState } from "react";

import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import Select from "@/components/common/Select";
import { MapResponse } from "@/types/response";

export const CATEGORY_LIST = [
  { id: 1, title: "서빙" },
  { id: 2, title: "주방" },
  { id: 3, title: "배달·운전" },
  { id: 4, title: "카페" },
  { id: 5, title: "청소" },
  { id: 6, title: "행사" },
  { id: 7, title: "포장·물류" },
  { id: 8, title: "기타" }
];

type MapMissionListProps = {
  data: MapResponse["data"]["content"];
  curRef: RefObject<HTMLDivElement>;
};

const MapMissionList = ({ data, curRef }: MapMissionListProps) => {
  const [missionList, setMissionList] = useState(data);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setMissionList(data);
      return;
    }

    const newList = data.filter(
      (list) => list.missionCategory.id === Number(e.target.value)
    );

    setMissionList(newList);
  };

  return (
    <>
      <div className="absolute left-1/2 top-0 z-30 mt-3 h-1 w-10 translate-x-[-50%] transform rounded-xl bg-gray-300" />
      <Select onChange={handleChange} className="cs:mt-10">
        <option value={"all"}>전체보기</option>
        {CATEGORY_LIST.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Select>
      <div className="mt-5 h-0 border border-neutral-200" />
      <div className="mt-7 h-full w-full overflow-y-auto pb-2 pt-1">
        {missionList &&
          missionList.map(
            ({
              id,
              title,
              missionCategory,
              region,
              missionDate,
              startTime,
              endTime,
              price,
              imagePath
            }) => (
              <Link key={id} href={`/misson/${id}`} className="w-11/12">
                <MissionFullInfo
                  missionCategory={missionCategory}
                  region={region}
                  missionInfo={{
                    title,
                    missionDate,
                    startTime,
                    endTime,
                    price
                  }}
                  missionImagePath={imagePath}
                />
              </Link>
            )
          )}
        <div ref={curRef} />
      </div>
    </>
  );
};

export default MapMissionList;
