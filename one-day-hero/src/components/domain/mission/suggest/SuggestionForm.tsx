"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { getClientToken } from "@/app/utils/cookie";
import Container from "@/components/common/Container";
import FooterButton from "@/components/common/FooterButton";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useToast } from "@/contexts/ToastProvider";
import {
  useGetSuggestingMissionListFetch,
  useProposeMissionFetch
} from "@/services/missions";
import { MissionProposalRequest } from "@/types/request";
import { UserResponse } from "@/types/response";

type SuggestionFormProps = {
  heroData: UserResponse["data"];
  heroId: number;
};

const SuggestionForm = ({ heroData, heroId }: SuggestionFormProps) => {
  const token = getClientToken();

  const { showToast } = useToast();

  const router = useRouter();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetSuggestingMissionListFetch(token ?? "", observerRef);

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

  const { mutationalFetch } = useProposeMissionFetch();

  const submitProposal: SubmitHandler<MissionProposalRequest> = async (
    data
  ) => {
    await mutationalFetch(
      {
        method: "POST",
        body: JSON.stringify(data)
      },
      () => {
        showToast(
          `"${heroData.basicInfo.nickname}" 님에게 미션을 제안했어요!`,
          "success"
        );
        router.push("/mission/list/ongoing");
      }
    );
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
        {data.map(({ id, mission }) => (
          <Container
            key={id}
            onClick={() => {
              setValue("missionId", id);
            }}
            className={`cs:m-0 cs:w-full ${
              selectedMissionId === id ? selectedStyle : ""
            }`}>
            <MissionFullInfo
              bookmarkCount={mission.bookmarkCount}
              createdAt={mission.createdAt}
              missionCategory={mission.missionCategory}
              missionInfo={mission.missionInfo}
              region={mission.region}
            />
          </Container>
        ))}
        <div ref={observerRef} />
      </div>
      <FooterButton
        formId="suggest"
        theme={inactive ? "inactive" : "primary"}
        disabled={inactive}>
        미션 제안하기
      </FooterButton>
    </form>
  );
};

export default SuggestionForm;
