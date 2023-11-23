"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import Container from "@/components/common/Container";
import FooterButton from "@/components/common/FooterButton";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useToast } from "@/contexts/ToastProvider";
import { useProposeMissionFetch } from "@/services/missions";
import { MissionProposalRequest } from "@/types/request";
import { SuggestingMissionListResponse, UserResponse } from "@/types/response";

type SuggestionFormProps = {
  missionListData: SuggestingMissionListResponse["data"]["content"];
  heroData: UserResponse["data"];
  heroId: number;
};

const SuggestionForm = ({
  missionListData,
  heroData,
  heroId
}: SuggestionFormProps) => {
  const userId = 123;

  const { showToast } = useToast();

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<MissionProposalRequest>({
    defaultValues: { userId, heroId }
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
        {missionListData.map(({ id, mission }) => (
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
