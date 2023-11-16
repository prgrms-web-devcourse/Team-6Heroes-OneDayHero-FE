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
  missionCategoryId: 1;
  citizenId: 1;
  regionId: 1;
  latitude: 1234252.23;
  longitude: 1234277.388;
  missionInfo: {
    title: "제목";
    content: "내용";
    missionDate: "2023-10-10";
    startTime: "10:00";
    endTime: "10:30";
    deadlineTime: "2023-10-10T10:00:00";
    price: 10000;
  };
};
