import { DateType } from ".";

export type UserEditRequest = {
  userId: number;
  basicInfo: {
    nickname: string;
    gender: string;
    birth: string;
    introduce: string;
  };
  favoriteWorkingDay: {
    favoriteDate: DateType[];
    favoriteStartTime: string;
    favoriteEndTime: string;
  };
};

export type MissionCreateRequest = {
  missionCategoryId: number;
  regionName: string;
  latitude: number;
  longitude: number;
  missionInfo: {
    title: string;
    content: string;
    missionDate: string;
    startTime: string;
    endTime: string;
    deadlineTime: string;
    price: number;
  };
};

export type MissionProposalRequest = {
  userId: number;
  missionId: number;
  heroId: number;
};
