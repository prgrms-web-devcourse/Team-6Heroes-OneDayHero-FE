import { DateType } from ".";

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
    longitude: number;
    latitude: number;
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

export type ProgressMissionListResponse = {
  status: number;
  data: {
    content: {
      id: number;
      title: string;
      missionCategory: {
        id: number;
        code: string;
        name: string;
      };
      missionDate: string;
      bookmarkCount: number;
      missionStatus:
        | "MATCHING"
        | "MATCHING_COMPLETED"
        | "MISSION_COMPLETED"
        | "EXPIRED";
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
    size: 4;
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
  serverDateTime: string;
};

export type MissionItemResponse = {
  id: number;
  status: "MATCHING" | "MATCHING_COMPLETED" | "MISSION_COMPLETED" | "EXPIRED";
  bookmarkCount: number;
  createdAt: string;
  region: {
    si: string;
    gu: string;
    dong: string;
  };
  missionCategory: {
    code: string;
    name: string;
  };
  missionInfo: {
    title: string;
    missionDate: string;
    startTime: string;
    endTime: string;
    price: number;
  };
};

export type SuggestedMissionListResponse = {
  status: number;
  data: {
    content: {
      id: number;
      mission: MissionItemResponse;
    }[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    empty: boolean;
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
      favoriteDate: DateType[];
      favoriteStartTime: string;
      favoriteEndTime: string;
    };
    heroScore: number;
    isHeroMode: boolean;
  };
  serverDateTime: string;
};

export type UserSummaryResponse = {
  status: number;
  data: {
    id: number;
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

export type ReviewDetailResponse = {
  status: number;
  data: {
    id: number;
    senderId: number;
    senderNickName: string;
    receiverId: number;
    missionCategory: {
      id: number;
      code: string;
      name: string;
    };
    missionTitle: string;
    content: string;
    starScore: 1 | 2 | 3 | 4 | 5;
    reviewImageResponses: {
      id: number;
      uniqueName: string;
      path: string;
    }[];
    createdAt: string;
  };
  serverDateTime: string;
};
