"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { favoriteRegionsData } from "@/app/api/v1/mock/_data/survey";
import Category from "@/components/common/Category";
import Select from "@/components/common/Select";

const MissionSearchFilter = () => {
  const [gu, setGu] = useState<string>("");
  const [dong, setDong] = useState<string>("");
  const [dongId, setDongId] = useState<number>(0);

  const selectedCategoryId = Number(useSearchParams().get("category"));
  const [categoryId, setCategoryId] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | number
  >(selectedCategoryId ?? 0);

  const seoulGu = favoriteRegionsData["서울시"].map(
    (region) => Object.keys(region)[0]
  );

  const seoulDong = favoriteRegionsData["서울시"].filter(
    (region) => gu in region
  )?.[0]?.[gu];

  const handleGuChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGu(e.target.value);
  };

  const handleDongChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDong(e.target.options[e.target.selectedIndex].dataset.dong ?? "");

    setDongId(Number(e.target.value));
  };

  const handleCategorySelect = (id: number) => {
    setCategoryId(id);
  };

  return (
    <>
      <div className="mx-4 mt-1 flex gap-2">
        <Select id="si">
          <option className="text-xs" key="서울시">
            서울시
          </option>
        </Select>

        <Select id="gu" onChange={handleGuChange}>
          {seoulGu.map((gu) => (
            <option className="text-xs" key={gu} value={gu}>
              {gu}
            </option>
          ))}
        </Select>

        <Select id="dong" onChange={handleDongChange}>
          {seoulDong &&
            seoulDong.map(
              ({ regionId, dong }: { regionId: number; dong: string }) => (
                <option
                  className="text-xs"
                  key={regionId}
                  value={regionId}
                  data-dong={dong}>
                  {dong}
                </option>
              )
            )}
        </Select>
      </div>
      <div className="border-background-darken mt-3 flex justify-center border-b pb-2">
        <Category
          onSelect={handleCategorySelect}
          value={categoryId}
          size="sm"
        />
      </div>
    </>
  );
};

export default MissionSearchFilter;
