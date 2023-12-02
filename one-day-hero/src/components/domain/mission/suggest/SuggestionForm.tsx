"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Container from "@/components/common/Container";
import FooterButton from "@/components/common/FooterButton";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useToast } from "@/contexts/ToastProvider";
import {
  useGetSuggestingMissionListFetch,
  useProposeMissionFetch
} from "@/services/missions";
import { MissionProposalRequest } from "@/types/request";
import { SuggestingMissionListResponse, UserResponse } from "@/types/response";
import { getClientToken } from "@/utils/cookie";

type SuggestionFormProps = {
  heroData: UserResponse["data"];
  heroId: number;
};

const SuggestionForm = ({ heroData, heroId }: SuggestionFormProps) => {
  const token = getClientToken();
  const [data, setData] = useState<
    SuggestingMissionListResponse["data"]["missionMatchingResponses"]
  >([]);

  const { showToast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { mutationalFetch: getMissionsFetch } =
    useGetSuggestingMissionListFetch(token ?? "", heroId);

  useEffect(() => {
    const getMissions = async () => {
      const { isError, response } = await getMissionsFetch();

      if (isError || !response) {
        router.refresh();
        return;
      }

      setData(response.data.missionMatchingResponses);
    };

    getMissions();
  }, []);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<MissionProposalRequest>({
    defaultValues: { heroId }
  });

  const selectedMissionId = watch("missionId");
  const inactive = selectedMissionId === undefined || isSubmitting;

  const { mutationalFetch, isLoading } = useProposeMissionFetch();

  const submitProposal: SubmitHandler<MissionProposalRequest> = async (
    data
  ) => {
    if (inactive || isPending || isLoading) return;

    const { isError, response } = await mutationalFetch({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (isError) {
      showToast(
        `미션 제안 처리 중 문제가 발생했어요. 다시 시도해주세요`,
        "error"
      );
    } else {
      showToast(
        `"${heroData.basicInfo.nickname}" 님에게 미션을 제안했어요!`,
        "success"
      );

      startTransition(() => {
        router.push("/mission/list/ongoing");
      });
    }
  };

  const selectedStyle =
    "cs:border-4 cs:border-primary cs:bg-primary-lightest cs:p-2";

  return (
    <form
      id="suggest"
      className="w-full"
      onSubmit={handleSubmit(submitProposal)}>
      <div className="flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
        <h2 className="w-full break-keep text-left text-xl font-semibold">
          {`"${heroData.basicInfo.nickname}"`} 님에게 제안할 미션을 골라주세요!
        </h2>
        {data.map(
          ({
            id,
            bookmarkCount,
            missionCategory,
            title,
            missionDate,
            startTime,
            endTime,
            price,
            region,
            imagePath
          }) => (
            <Container
              key={id}
              onClick={() => {
                setValue("missionId", id);
              }}
              className={`cs:m-0 cs:w-full ${
                selectedMissionId === id ? selectedStyle : ""
              }`}>
              <MissionFullInfo
                bookmarkCount={bookmarkCount}
                missionCategory={missionCategory}
                missionInfo={{ title, missionDate, startTime, endTime, price }}
                region={region}
                missionImagePath={imagePath}
              />
            </Container>
          )
        )}
      </div>
      <div className="fixed bottom-0 w-full">
        <FooterButton
          formId="suggest"
          theme={inactive ? "inactive" : "primary"}
          disabled={inactive || isPending || isLoading}
          className={"-left-5 cs:absolute"}>
          미션 제안하기
        </FooterButton>
      </div>
    </form>
  );
};

export default SuggestionForm;
