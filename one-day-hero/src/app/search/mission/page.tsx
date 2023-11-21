"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { favoriteRegionsData } from "@/app/api/v1/mock/_data/survey";
import Category from "@/components/common/Category";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import Select from "@/components/common/Select";
import { useGetSuggestedMissionListFetch } from "@/services/missions";
import { MissionItemResponse } from "@/types/response";
import {
  MissionSearchFilterSchema,
  MissionSearchFilterSchemaProps
} from "@/types/schema";

/**@note 이건 나중에 변경되거나 빠질 거 같아요. */
type fetchDataProps = { id: number; mission: MissionItemResponse }[];

const MissionSearchPage = () => {
  const [gu, setGu] = useState<string>("");
  const [dong, setDong] = useState<string>("");
  const [dongId, setDongId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<fetchDataProps>();

  const selectedCategoryId = Number(useSearchParams().get("category"));

  const [categoryId, setCategoryId] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | number
  >(selectedCategoryId ?? 0);

  const { setValue, getValues } = useForm<MissionSearchFilterSchemaProps>({
    resolver: zodResolver(MissionSearchFilterSchema)
  });

  useEffect(() => {
    const categoryId = String(getValues("categoryId"));
    const regionId = String(getValues("dongId"));

    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await useGetSuggestedMissionListFetch("1");
        console.log("for check", categoryId, regionId);
        setFetchedData(data);
      } catch (error) {
        console.error(
          "미션 검색 데이터를 불러오는 중 오류가 발생했어요:",
          error
        );
      }
    };

    fetchData();
  }, [dongId, getValues, categoryId]);

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

    setValue("dongId", String(dongId));
  };

  const handleCategorySelect = (id: number) => {
    setCategoryId(id);

    setValue("categoryId", String(categoryId));
  };

  return (
    <>
      <section
        className="fixed z-50 mt-[4.5rem] 
w-full max-w-screen-sm">
        <div className="mx-4 mt-1 flex gap-2">
          <Select id="si">
            <option value="seoul" selected hidden>
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
      </section>

      <section className="mt-56 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
        {fetchedData &&
          fetchedData.map(({ id, mission }) => (
            <Link
              href={`/mission/${id}`}
              className="flex w-full max-w-screen-sm justify-center"
              key={id}>
              <Container className="cs:w-11/12" missionStatus={mission.status}>
                <MissionFullInfo
                  bookmarkCount={mission.bookmarkCount}
                  createdAt={mission.createdAt}
                  region={mission.region}
                  missionCategory={mission.missionCategory}
                  missionInfo={mission.missionInfo}
                />
              </Container>
            </Link>
          ))}
      </section>
    </>
  );
};

export default MissionSearchPage;
