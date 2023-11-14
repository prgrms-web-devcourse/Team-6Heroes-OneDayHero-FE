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

export type MatchingMissionListResponse = {
  status: number;
  data: {
    userId: number;
    missionResponses: {
      content: {
        missionId: number;
        missionBookmarkId: number;
        isAlive: boolean;
        missionInfo: {
          title: string;
          categoryName: string;
          bookmarkCount: number;
          price: number;
          missionDate: string;
          startTime: string;
          endTime: string;
        };
        region: {
          id: number;
          si: string;
          gu: string;
          dong: string;
        };
      }[];
      pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
      };
      size: number;
      number: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      first: boolean;
      last: boolean;
      numberOfElements: number;
      empty: boolean;
    };
  };
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
