export type MissionResponse = {
  status: number;
  data: {
    id: number;
    missionCategory: {
      id: number;
      code: string;
      name: string;
    };
    citizenId: number;
    region: {
      id: number;
      si: string;
      gu: string;
      dong: string;
    };
    location: {
      x: number;
      y: number;
    };
    missionInfo: {
      title: string;
      content: string;
      missionDate: string;
      startTime: string;
      endTime: string;
      deadlineTime: string;
      price: number;
    };
    bookmarkCount: number;
    bookmarkList: number[];
    missionStatus: "MATCHING";
  };
  serverDateTime: string;
};

export type UserResponse = {
  status: number;
  data: {
    userId: number;
    basicInfo: {
      nickname: string;
      gender: string;
      birth: string;
      introduce: string;
    };
    favoriteWorkingDay: {
      favoriteDate: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
      favoriteStartTime: string;
      favoriteEndTime: string;
    };
  };
  serverDateTime: string;
};
