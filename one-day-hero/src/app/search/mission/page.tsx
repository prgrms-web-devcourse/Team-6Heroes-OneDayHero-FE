"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getClientToken } from "@/app/utils/cookie";
import Category from "@/components/common/Category";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import Select from "@/components/common/Select";
import { useGetRegionsFetch } from "@/services/regions";
import { useGetMissionSearchListFetch } from "@/services/search";

type dongProps = { id: number; dong: string };

type guProps = { gu: string; dong: dongProps[] }[];

const MissionSearchPage = () => {
  const [guData, setGuData] = useState<guProps>([]);
  const [selectedGu, setSelectedGu] = useState<string>();
  const [dongData, setDongData] = useState<dongProps[]>();
  const [selectedDong, setSelectedDong] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [dongId, setDongId] = useState<string>();
  const [sort, setSort] = useState<string>("");

  const guRef = useRef<HTMLSelectElement | null>(null);
  const dongRef = useRef<HTMLSelectElement | null>(null);

  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, setSearchParams } = useGetMissionSearchListFetch(
    token ?? "",
    observerRef
  );

  const { mutationalFetch } = useGetRegionsFetch(token ?? "");

  const queryString = Number(useSearchParams().get("category"));
  const router = useRouter();

  useEffect(() => {
    handleCategorySelect(queryString);

    router.push("/search/mission");
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { response, isError, errorMessage } = await mutationalFetch({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response) {
          const { gu } = response.data[0];

          setGuData(gu);
        } else if (isError) {
          console.log(errorMessage);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const dong = guData?.find((item) => item.gu === selectedGu)?.dong;

    setDongData(dong);
  }, [selectedGu]);

  const makeSortValue = (dongId?: string, selectedCategoryId?: number) => {
    if (selectedCategoryId && dongId) {
      setSort(
        `&missionCategoryCodes=MC_00${selectedCategoryId}&regionIds=${dongId}`
      );
    } else if (selectedCategoryId && !dongId) {
      setSort(`&missionCategoryCodes=MC_00${selectedCategoryId}`);
    } else if (!selectedCategoryId && dongId) {
      setSort(`&regionIds=${dongId}`);
    }
  };

  useEffect(() => {
    setSearchParams(sort);
  }, [sort]);

  const handleGuSelect = () => {
    const gu = guRef.current?.value;

    setSelectedGu(gu);
  };

  const handleDongSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const dong = dongRef.current?.value;
    const dongId = e.target.options[e.target.selectedIndex].dataset.id;

    setSelectedDong(dong);
    setDongId(dongId);

    makeSortValue(dongId, selectedCategoryId);
  };

  const handleCategorySelect = (id: number) => {
    setSelectedCategoryId(id);
    makeSortValue(dongId, id);
  };

  const SelectDefaultStyle =
    "border-inactive focus:outline-primary w-full h-[2.13rem] rounded-[0.625rem] border pl-2";

  return (
    <>
      <section
        className="fixed z-50 mt-[4.5rem] 
w-full max-w-screen-sm">
        <div className="mx-4 mt-1 flex gap-2">
          <Select value="서울특별시">
            <option value="서울특별시" key={uuidv4()}>
              서울특별시
            </option>
          </Select>

          <select
            id="gu"
            ref={guRef}
            onChange={handleGuSelect}
            className={SelectDefaultStyle}>
            <option>{selectedGu ?? "선택"}</option>
            {guData &&
              guData.map((data) => (
                <option className="text-xs" key={uuidv4()}>
                  {data.gu}
                </option>
              ))}
          </select>

          <select
            id="dong"
            ref={dongRef}
            onChange={handleDongSelect}
            className={SelectDefaultStyle}>
            <option>{selectedDong ?? "선택"}</option>
            {dongData &&
              dongData.map(({ id, dong }: dongProps) => (
                <option
                  className="text-xs"
                  key={id + uuidv4()}
                  value={dong}
                  data-id={id}>
                  {dong}
                </option>
              ))}
          </select>
        </div>

        <div className="border-background-darken mt-3 flex justify-center border-b pb-2">
          <Category onSelect={handleCategorySelect} size="sm" />
        </div>
      </section>

      <section className="mt-56 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
        {data.map(
          ({
            id,
            bookmarkCount,
            missionInfo,
            region,
            missionStatus,
            missionCategory
          }) => (
            <Link
              href={`/mission/${id}`}
              className="flex w-full max-w-screen-sm justify-center"
              key={id}>
              <Container className="cs:w-11/12" missionStatus={missionStatus}>
                <MissionFullInfo
                  bookmarkCount={bookmarkCount}
                  createdAt={missionInfo.missionDate}
                  region={region}
                  missionCategory={missionCategory}
                  missionInfo={missionInfo}
                />
              </Container>
            </Link>
          )
        )}
        <div ref={observerRef} />
      </section>
    </>
  );
};

export default MissionSearchPage;
