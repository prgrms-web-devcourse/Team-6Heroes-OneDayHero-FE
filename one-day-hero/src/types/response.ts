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
    missionStatus:
      | "MATCHING"
      | "MATCHING_COMPLETED"
      | "MISSION_COMPLETED"
      | "EXPIRED";
    missionImage: {
      id: number;
      path: string;
    }[];
    isBookmarked: boolean;
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
      si: string;
      gu: string;
      dong: string;
      bookmarkCount: number;
      missionStatus:
        | "MATCHING"
        | "MATCHING_COMPLETED"
        | "MISSION_COMPLETED"
        | "EXPIRED";
      imagePath: string;
      isBookmarked: boolean;
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
  citizenId: number;
  status: "MATCHING" | "MATCHING_COMPLETED" | "MISSION_COMPLETED" | "EXPIRED";
  bookmarkCount: number;
  isBookmarked: boolean;
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
  imagePath: string;
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

export type SuggestingMissionListResponse = {
  status: number;
  data: {
    missionMatchingResponses: {
      id: number;
      title: string;
      missionCategory: {
        id: number;
        code: string;
        name: string;
      };
      region: {
        id: number;
        si: string;
        gu: string;
        dong: string;
      };
      missionCreatedAt: string;
      missionDate: string;
      startTime: string;
      endTime: string;
      price: number;
      bookmarkCount: number;
      missionStatus: string;
      imagePath: string;
      isBookmarked: true;
    }[];
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
  favoriteWorkingDay: {
    favoriteDate: DateType[] | null;
    favoriteStartTime: string | null;
    favoriteEndTime: string | null;
  };
  favoriteRegions: number[];
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
      id: number;
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
      favoriteDate: DateType[] | null;
      favoriteStartTime: string | null;
      favoriteEndTime: string | null;
    };
  };
  serverDateTime: string;
};

type dong = {
  id: number;
  dong: string;
};

type gu = {
  gu: string;
  dong: dong[];
};

type si = {
  si: string;
  gu: gu[];
};

export type RegionsResponse = {
  status: number;
  data: si[];
  serverDateTime: string;
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
    senderProfileImage: [string];
    receiverId: number;
    receiverNickname: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
    missionTitle: string;
    content: string;
    starScore: 1 | 2 | 3 | 4 | 5;
    reviewImageResponses: {
      id: number;
      originalName?: string;
      uniqueName?: string;
      path: string;
    }[];
    createdAt: string;
  };
  serverDateTime: string;
};

export type ReviewListResponse = {
  status: number;
  data: {
    content: {
      reviewId: number;
      senderId?: number;
      senderNickname: string;
      categoryName: string;
      missionTitle: string;
      starScore: 1 | 2 | 3 | 4 | 5;
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

export type MissionSearchListResponse = {
  status: number;
  data: {
    content: {
      id: number;
      missionCategory: {
        id: number;
        code: string;
        name: string;
      };
      citizenId: number;
      bookmarkCount: number;
      missionStatus:
        | "MATCHING"
        | "MATCHING_COMPLETED"
        | "MISSION_COMPLETED"
        | "EXPIRED";
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
      paths: string[];
      isBookmarked: boolean;
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

export type HeroNicknameSearchResponse = {
  status: number;
  data: {
    content: {
      id: number;
      nickname: string;
      image: {
        originalName: string | null;
        uniqueName: string | null;
        path: string | null;
      };
      favoriteMissionCategories: [
        {
          code: string;
          name: string;
        }
      ];
      heroScore: 30;
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

export type HeroNicknameResponse = {
  id: number;
  nickname: string;
  image: {
    originalName: string | null;
    uniqueName: string | null;
    path: string | null;
  };
  favoriteMissionCategories: [{ code: string; name: string }];
  heroScore: 30;
}[];

export type EmptyResponse = {
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
    missionId: number;
    missionStatus:
      | "MATCHING"
      | "MATCHING_COMPLETED"
      | "MISSION_COMPLETED"
      | "EXPIRED";
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

export type ChatRoomSummaryResponse = {
  status: number;
  data: {
    id: number;
    missionId: number;
    headCount: number;
  };
  serverDateTime: string;
};

export type ChatRecordResponse = {
  status: number;
  data: {
    message: string;
    senderId: number;
    senderNickName: string;
    sentMessageTime: string;
  }[];
  serverDateTime: string;
};

export type MatchResponse = {
  status: number;
  data: {
    id: number;
  };
  serverDateTime: string;
};

export type HomeResponse = {
  status: number;
  data: {
    missionCategories: {
      id: number;
      code: string;
      name: string;
    }[];
    soonExpiredMissions: {
      id: number;
      title: string;
      region: {
        id: number;
        si: string;
        gu: string;
        dong: string;
      };
      missionCategory: {
        id: number;
        code: string;
        name: string;
      };
      missionDate: string;
      startTime: string;
      endTime: string;
      price: number;
      bookmarkCount: number;
      missionStatus: string;
      imagePath: string;
      isBookmarked: boolean;
    }[];
  };
  serverDateTime: string;
};

export type NotificationResponse = {
  status: number;
  data: {
    content: {
      id: string;
      title: string;
      content: string;
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
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  serverDateTime: string;
};

export type ProfileResponse = {
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

export type MapResponse = {
  status: number;
  data: {
    content: {
      id: number;
      missionCategory: {
        id: number;
        code: string;
        name: string;
      };
      region: {
        id: number;
        si: string;
        gu: string;
        dong: string;
      };
      title: string;
      longitude: number;
      latitude: number;
      missionDate: string;
      startTime: string;
      endTime: string;
      price: number;
      imagePath: string;
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

export type EditMissionResponse = {
  status: number;
  data: {
    id: number;
  };
  serverDateTime: string;
};
