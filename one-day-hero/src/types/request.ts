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
