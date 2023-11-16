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
    isBookmarked: boolean;
    missionStatus:
      | "MATCHING"
      | "MATCHING_COMPLETED"
      | "MISSION_COMPLETED"
      | "EXPIRED";
    missionImage: {
      originalName: string;
      path: string;
    };
  };
  serverDateTime: string;
};

export type OngoingMissionListResponse = {
  status: number;
  data: MissionResponse["data"][];
  serverDateTime: string;
};

export type SuggestedMissionListResponse = {
  status: number;
  data: MissionResponse["data"][];
  serverDateTime: string;
};

export type BookmarkResponse = {
  status: number;
  data: {
    id: number;
    missionId: number;
    userId: number;
  };
  serverDateTime: string;
};

export type UserResponse = {
  status: number;
  data: {
    basicInfo: {
      nickname: string;
      gender: string;
      birth: string;
      introduce: string;
    };
    image: {
      originalName: string;
      uniqueName: string;
      path: string;
    };
    favoriteWorkingDay: {
      favoriteDate: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
      favoriteStartTime: string;
      favoriteEndTime: string;
    };
    heroScore: number;
  };
  serverDateTime: string;
};

type dong = {
  regionId: number;
  dong: string;
};

type gu = {
  [key: string]: dong[] | undefined;
};

export type favoriteRegionsResponse = {
  서울시: gu[];
};
