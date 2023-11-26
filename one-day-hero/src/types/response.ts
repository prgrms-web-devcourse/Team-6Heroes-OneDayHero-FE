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

export type SuggestingMissionListResponse = SuggestedMissionListResponse;

export type BookmarkResponse = {
  status: number;
  data: {
    id: number;
    missionId: number;
    userId: number;
  };
  serverDateTime: string;
};

export type ProposalResponse = {
  status: number;
  data: {
    id: number;
    missionId: number;
    heroId: number;
    missionProposalStatus: "PROPOSAL" | "APPROVE" | "REJECT";
  };
  serverDateTime: string;
};

export type UserInfoForOptionalSurveyResponse = {
  basicInfo: {
    nickname: string;
    gender: string;
    birth: string;
    introduce: string;
  };
  favoriteWorkingDay?: {
    favoriteDate?: string[];
    favoriteStartTime?: string;
    favoriteEndTime?: string;
  };
  favoriteRegions?: number[];
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
      originalName: string | null;
      uniqueName: string | null;
      path: string | null;
    };
    favoriteWorkingDay: {
      favoriteDate: DateType[] | null;
      favoriteStartTime: string | null;
      favoriteEndTime: string | null;
    };
    favoriteRegions:
      | {
          id: number;
          si: string;
          gu: string;
          dong: string;
        }[]
      | null;
    heroScore: number;
    isHeroMode?: boolean;
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

export type CreateReviewResponse = {
  status: number;
  data: {
    id: number;
  };
  serverDateTime: string;
};

export type ReviewDetailResponse = {
  status: number;
  data: {
    id: number;
    senderId: number;
    senderNickname: string;
    receiverId: number;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
    missionTitle: string;
    content: string;
    starScore: 1 | 2 | 3 | 4 | 5;
    reviewImageResponses: {
      id: number;
      originalName: string;
      uniqueName: string;
      path: string;
    }[];
    createdAt: string;
  };
  serverDateTime: string;
};

export type SendReviewResponse = {
  status: number;
  data: {
    content: {
      reviewId: number;
      categoryName: string;
      missionTitle: string;
      starScore: 1 | 2 | 3 | 4 | 5;
      senderNickname: string;
      profileImage: [string] | [];
      createdAt: string;
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

export type ReviewDeleteResponse = {
  status: number;
  data: null;
  serverDateTime: string;
};

export type ReviewReceiveResponse = {
  status: number;
  data: {
    content: {
      reviewId: number;
      senderId: number;
      senderNickname: string;
      profileImage: [string] | [];
      categoryName: string;
      missionTitle: string;
      starScore: 1 | 2 | 3 | 4 | 5;
      createdAt: string;
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
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  serverDateTime: string;
};

export type ChatRoomsResponse = {
  status: number;
  data: {
    id: number;
    receiverId: number;
    title: string;
    receiverNickname: string;
    receiverImagePath: string;
    lastSentMessage: string;
    headCount: number;
    lastSentMessageTime: string;
  }[];
  serverDateTime: string;
};

export type ChatRecordResponse = {
  status: number;
  data: {
    message: string;
    senderNickName: string;
    sentMessageTime: string;
  }[];
  serverDateTime: string;
};
