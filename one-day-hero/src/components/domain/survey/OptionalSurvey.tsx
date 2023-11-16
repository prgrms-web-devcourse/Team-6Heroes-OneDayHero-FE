"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { PiWaveSineBold } from "react-icons/pi";

import { favoriteRegionsData } from "@/app/api/v1/mock/_data/survey";
import Button from "@/components/common/Button";
import DayList from "@/components/common/DayList";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import InputLabel from "@/components/common/InputLabel";
import Label from "@/components/common/Label";
import LinkButton from "@/components/common/LinkButton";
import Select from "@/components/common/Select";
import { OptionalSurveySchema } from "@/types/schema";

const OptionalSurvey = () => {
  const [favoriteGu, setFavoriteGu] = useState<string>("");
  const [favoriteDong, setFavoriteDong] = useState<string>("");
  const [favoriteDongId, setFavoriteDongId] = useState<number>(0);
  const [favoriteRegions, setFavoriteRegions] = useState<string[]>([]);
  const [favoriteRegionsId, setFavoriteRegionsId] = useState<number[]>([]);

  const { register, handleSubmit, setValue, getValues } = useForm({
    resolver: zodResolver(OptionalSurveySchema)
  });

  const hours = Array.from({ length: 24 }, (_, index) =>
    index < 10 ? "0" + index : index
  );

  const seoulGu = favoriteRegionsData["서울시"].map(
    (region) => Object.keys(region)[0]
  );

  const seoulDong = favoriteRegionsData["서울시"].filter(
    (region) => favoriteGu in region
  )?.[0]?.[favoriteGu];

  useEffect(() => {
    setValue("favoriteRegions", [...favoriteRegionsId]);
  }, [favoriteRegionsId, setValue]);

  const handleAddFavoriteRegion = () => {
    const selectedGuDong = favoriteGu + " " + favoriteDong;

    if (favoriteDongId === 0 || favoriteGu === "") {
      return;
    }

    if (favoriteRegions.includes(selectedGuDong)) {
      alert("이미 선택한 지역입니다."); /**@note toast로 바꿀 예정 */
      return;
    }

    if (favoriteRegions.length === 5) {
      alert(
        "선호지역은 최대 5개 선택할 수 있습니다."
      ); /**@note toast로 바꿀 예정 */
    }

    setFavoriteRegions([...favoriteRegions, selectedGuDong]);
    setFavoriteRegionsId([...favoriteRegionsId, favoriteDongId]);
  };

  const handleRemoveFavoriteRegion = () => {
    const updatedFavoriteRegions = favoriteRegions.slice(
      0,
      favoriteRegions.length - 1
    );
    const updatedFavoriteRegionsId = favoriteRegionsId.slice(
      0,
      favoriteRegionsId.length - 1
    );

    setFavoriteRegions(updatedFavoriteRegions);
    setFavoriteRegionsId(updatedFavoriteRegionsId);

    setValue("FavoriteRegions", updatedFavoriteRegionsId);
  };

  const handleGuChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFavoriteGu(e.target.value);
  };

  const handleDongChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFavoriteDong(
      e.target.options[e.target.selectedIndex].dataset.dong ?? ""
    );

    setFavoriteDongId(Number(e.target.value));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data", data); /** @note 서버로 보낼때 사용할 것 같습니다.  */
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onSubmit)}
        className="flex w-full max-w-screen-sm flex-col gap-8">
        <div>
          <InputLabel className="cs:text-xl cs:ml-1 cs:mb-1">
            희망 근무일
          </InputLabel>
          <DayList
            {...register("favoriteWorkingDay.favoriteDate")}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        <div>
          <InputLabel
            htmlFor="working hour"
            className="cs:text-xl cs:ml-1 cs:mb-1">
            희망 근무시간
          </InputLabel>
          <div className="mt-1 flex gap-2">
            <Select
              id="working hour start"
              setValue={setValue}
              {...register("favoriteWorkingDay.favoriteStartTime")}>
              {hours.map((hour) => (
                <option className="text-xs" key={hour}>
                  {hour}:00
                </option>
              ))}
            </Select>

            <span className="text-bold my-auto">
              <PiWaveSineBold />
            </span>

            <Select
              id="working hour end"
              setValue={setValue}
              {...register("favoriteWorkingDay.favoriteEndTime")}>
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
            <Select id="favorite gu" onChange={handleGuChange}>
              {seoulGu.map((gu) => (
                <option className="text-xs" key={gu} value={gu}>
                  {gu}
                </option>
              ))}
            </Select>

            <Select id="favorite dong" onChange={handleDongChange}>
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

            <Button
              theme="primary"
              className="cs:h-9 cs:w-9 cs:rounded-xl cs:px-3 cs:text-white"
              onClick={handleAddFavoriteRegion}>
              <AiOutlinePlus className="pr-4 text-3xl" />
            </Button>
            <Button
              theme="primary"
              className="cs:h-9 cs:w-9 cs:rounded-xl cs:px-3 cs:text-white"
              onClick={handleRemoveFavoriteRegion}>
              <AiOutlineClose className="pr-4 text-3xl" />
            </Button>
          </div>

          <HorizontalScroll className="cs:mt-2">
            {favoriteRegions &&
              favoriteRegions.map((region: string) => (
                <Label
                  key={region}
                  size="md"
                  className="cs:min-w-fit cs:px-3 cs:mr-2">
                  {region}
                </Label>
              ))}
          </HorizontalScroll>
        </div>

        <div className="bg-cancel-lighten h-56 w-full rounded-2xl">
          지도자리
        </div>

        <div className="mt-12 flex w-full">
          <LinkButton
            theme="cancel"
            href="/"
            showChevron={false}
            className="cs:grow cs:m-2">
            건너뛰기
          </LinkButton>
          <LinkButton
            href="/survey/category"
            className="cs:grow cs:m-2"
            showChevron={false}>
            <Button type="submit">다음</Button>
          </LinkButton>
        </div>
      </form>
    </>
  );
};

export default OptionalSurvey;