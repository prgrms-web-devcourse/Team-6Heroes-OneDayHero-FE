"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { PiWaveSineBold } from "react-icons/pi";

import Button from "@/components/common/Button";
import DayList from "@/components/common/DayList";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import InputLabel from "@/components/common/InputLabel";
import Label from "@/components/common/Label";
import Select from "@/components/common/Select";
import { useToast } from "@/contexts/ToastProvider";
import { useGetRegionsFetch } from "@/services/regions";
import { useEditProfileFetch } from "@/services/users";
import { DateType } from "@/types";
import {
  ProfileResponse,
  UserInfoForOptionalSurveyResponse
} from "@/types/response";
import {
  OptionalSurveySchema,
  OptionalSurveySchemaProps
} from "@/types/schema";
import { getClientToken } from "@/utils/cookie";

type dongProps = { id: number; dong: string };

type guProps = { gu: string; dong: dongProps[] }[];

const OptionalSurvey = (userData: ProfileResponse) => {
  const [guData, setGuData] = useState<guProps>([]);
  const [favoriteGu, setFavoriteGu] = useState<string>("");
  const [favoriteDong, setFavoriteDong] = useState<string>("");
  const [favoriteDongId, setFavoriteDongId] = useState<number>(0);
  const [favoriteRegions, setFavoriteRegions] = useState<string[]>([]);
  const [favoriteRegionsId, setFavoriteRegionsId] = useState<number[]>([]);

  const { showToast } = useToast();

  const router = useRouter();
  const token = getClientToken();
  const [isPending, startTransition] = useTransition();

  const {
    basicInfo,
    favoriteWorkingDay: defaultWorkingDay,
    favoriteRegions: defaultRegions
  } = userData.data;

  useEffect(() => {
    const favoriteRegions = defaultRegions?.map(
      (region) => region.gu + " " + region.dong
    );
    const favoriteRegionsId = defaultRegions?.map((region) => region.id);

    setFavoriteRegions(favoriteRegions!);
    setFavoriteRegionsId(favoriteRegionsId!);

    setValue(
      "favoriteWorkingDay.favoriteDate",
      defaultWorkingDay.favoriteDate || undefined
    );
    setValue("favoriteRegions", favoriteRegionsId!);
  }, []);

  const { mutationalFetch: getRegionsMutationalFetch } = useGetRegionsFetch(
    token ?? ""
  );

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { response, isError, errorMessage } =
          await getRegionsMutationalFetch({
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

  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<OptionalSurveySchemaProps>({
      resolver: zodResolver(OptionalSurveySchema)
    });

  const favoriteWorkingDayWatch = watch("favoriteWorkingDay.favoriteDate");

  const hours = Array.from({ length: 24 }, (_, index) =>
    index < 10 ? "0" + index : index
  );

  const seoulDong = guData.find((region) => region.gu === favoriteGu)?.dong;

  useEffect(() => {
    setValue("favoriteRegions", [...favoriteRegionsId]);
  }, [favoriteRegionsId, setValue]);

  const handleAddFavoriteRegion = () => {
    const selectedGuDong = favoriteGu + " " + favoriteDong;

    if (favoriteDongId === 0 || favoriteGu === "") {
      return;
    }

    if (favoriteRegions.includes(selectedGuDong)) {
      showToast("이미 선택한 지역입니다.", "error");
      return;
    }

    if (favoriteRegions.length === 5) {
      showToast("선호지역은 최대 5개 선택할 수 있습니다.", "error");
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

    setValue("favoriteRegions", updatedFavoriteRegionsId);
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

  const { mutationalFetch: editProfileFetch, isLoading } =
    useEditProfileFetch();

  const onSubmit: SubmitHandler<OptionalSurveySchemaProps> = async (
    data: OptionalSurveySchemaProps
  ) => {
    if (isLoading || isPending) return;

    const { favoriteWorkingDay, favoriteRegions } = data;

    if (favoriteWorkingDay?.favoriteStartTime === "선택") {
      favoriteWorkingDay?.favoriteStartTime === null;
    }

    if (favoriteWorkingDay?.favoriteEndTime === "선택") {
      favoriteWorkingDay?.favoriteEndTime === null;
    }

    const userData: UserInfoForOptionalSurveyResponse = {
      basicInfo: basicInfo,
      favoriteWorkingDay: {
        favoriteDate: (favoriteWorkingDay?.favoriteDate as DateType[]) ?? [],
        favoriteEndTime: favoriteWorkingDay?.favoriteEndTime! ?? null,
        favoriteStartTime: favoriteWorkingDay?.favoriteStartTime! ?? null
      },
      favoriteRegions: favoriteRegions ?? []
    };

    const formData = new FormData();

    const jsonData = JSON.stringify(userData);

    formData.append(
      "userUpdateRequest",
      new Blob([jsonData], { type: "application/json" })
    );

    const { isError, errorMessage, response } = await editProfileFetch({
      method: "POST",
      body: formData
    });

    if (isError || !response) {
      showToast(
        errorMessage ?? "프로필 수정 중 오류가 발생했어요. 다시 시도해주세요",
        "error"
      );
      return;
    }

    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-screen-sm flex-col gap-8">
        <div>
          <InputLabel className="cs:mb-1 cs:ml-1 cs:text-xl">
            희망 근무일
          </InputLabel>
          <DayList
            {...register("favoriteWorkingDay.favoriteDate")}
            setValue={setValue}
            getValues={getValues}
            watch={favoriteWorkingDayWatch}
          />
        </div>

        <div>
          <InputLabel
            htmlFor="working hour"
            className="cs:mb-1 cs:ml-1 cs:text-xl">
            희망 근무시간
          </InputLabel>
          <div className="mt-1 flex gap-2">
            <Select
              value={defaultWorkingDay.favoriteStartTime || undefined}
              id="working hour start"
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
              value={defaultWorkingDay.favoriteEndTime || undefined}
              id="working hour end"
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
            className="cs:mb-1 cs:ml-1 cs:text-xl">
            선호지역
            <span className="text-cancel-darken text-sm">(최대 5개)</span>
          </InputLabel>
          <div className="mt-1 flex gap-2">
            <Select id="favorite gu" onChange={handleGuChange}>
              {guData.map((data) => (
                <option className="text-xs" key={data.gu} value={data.gu}>
                  {data.gu}
                </option>
              ))}
            </Select>

            <Select id="favorite dong" onChange={handleDongChange}>
              {seoulDong &&
                seoulDong.map(({ id, dong }: { id: number; dong: string }) => (
                  <option
                    className="text-xs"
                    key={id}
                    value={id}
                    data-dong={dong}>
                    {dong}
                  </option>
                ))}
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
                  className="cs:mr-2 cs:min-w-fit cs:px-3">
                  {region}
                </Label>
              ))}
          </HorizontalScroll>
        </div>

        <div className="h-56 w-full rounded-2xl" />

        <div className="mt-12 flex w-full">
          <Button
            theme="cancel"
            type="submit"
            className="cs:m-2 cs:grow"
            disabled={isLoading || isPending}>
            건너뛰기
          </Button>
          <Button
            type="submit"
            className="cs:m-2 cs:grow"
            disabled={isLoading || isPending}>
            다음
          </Button>
        </div>
      </form>
    </>
  );
};

export default OptionalSurvey;
