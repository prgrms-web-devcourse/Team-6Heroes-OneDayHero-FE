import {
  MissionResponse,
  ProgressMissionListResponse,
  ProposalResponse,
  SuggestedMissionListResponse,
  SuggestingMissionListResponse
} from "@/types/response";

export const missionDetail: MissionResponse = {
  status: 200,
  data: {
    id: 1,
    missionCategory: {
      id: 1,
      code: "MC_001",
      name: "서빙"
    },
    citizenId: 1,
    region: {
      id: 1,
      si: "서울시",
      gu: "강남구",
      dong: "역삼동"
    },
    longitude: 1234277.388,
    latitude: 1234252.23,
    missionInfo: {
      title: "제목",
      content:
        "[Intervention]Images loaded lazily and replaced with placeholders. Load events are deferred. See https://go.microsoft.com/fwlink/?linkid=2048113",
      missionDate: "2023-10-10",
      startTime: "10:00",
      endTime: "10:30",
      deadlineTime: "10:00",
      price: 10000
    },
    bookmarkCount: 0,
    isBookmarked: true,
    missionStatus: "MATCHING",
    missionImage: {
      originalName: "xxx.jpeg",
      path: "~~~~"
    }
  },
  serverDateTime: "2023-11-02T14:25:44"
};

export const progessMissionList: ProgressMissionListResponse = {
  status: 200,
  data: {
    content: [
      {
        id: 1,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 2,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 3,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 4,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 5,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 6,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 7,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 8,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      },
      {
        id: 9,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MATCHING"
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 4,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    size: 4,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    first: true,
    last: true,
    numberOfElements: 1,
    empty: false
  },
  serverDateTime: "2023-11-13T15:26:37"
};

export const suggestedMissionList: SuggestedMissionListResponse = {
  status: 200,
  data: {
    content: [
      {
        id: 1,
        mission: {
          id: 1,
          citizenId: 1,
          status: "MATCHING",
          bookmarkCount: 5,
          isBookmarked: true,
          createdAt: "2023-11-29T13:44:35",
          region: {
            si: "서울시",
            gu: "프로구",
            dong: "래머동"
          },
          missionCategory: {
            code: "MC_001",
            name: "서빙"
          },
          missionInfo: {
            title: "미션 제목",
            missionDate: "2023-10-30",
            startTime: "12:00",
            endTime: "18:00",
            price: 30000
          },
          imagePath: "s3://image"
        }
      },
      {
        id: 2,
        mission: {
          id: 2,
          citizenId: 1,
          status: "MATCHING",
          bookmarkCount: 5,
          isBookmarked: true,
          createdAt: "2023-11-28T13:44:35",
          region: {
            si: "서울시",
            gu: "프로구",
            dong: "래머동"
          },
          missionCategory: {
            code: "MC_001",
            name: "서빙"
          },
          missionInfo: {
            title: "미션 제목",
            missionDate: "2023-10-30",
            startTime: "12:00",
            endTime: "18:00",
            price: 30000
          },
          imagePath: "s3://image"
        }
      },
      {
        id: 3,
        mission: {
          id: 3,
          citizenId: 1,
          status: "MATCHING_COMPLETED",
          bookmarkCount: 5,
          isBookmarked: true,
          createdAt: "2023-11-26T13:44:35",
          region: {
            si: "서울시",
            gu: "프로구",
            dong: "래머동"
          },
          missionCategory: {
            code: "MC_001",
            name: "서빙"
          },
          missionInfo: {
            title: "미션 제목",
            missionDate: "2023-10-30",
            startTime: "12:00",
            endTime: "18:00",
            price: 30000
          },
          imagePath: "s3://image"
        }
      },
      {
        id: 4,
        mission: {
          id: 4,
          citizenId: 1,
          status: "MISSION_COMPLETED",
          bookmarkCount: 5,
          isBookmarked: true,
          createdAt: "2023-11-27T13:44:35",
          region: {
            si: "서울시",
            gu: "프로구",
            dong: "래머동"
          },
          missionCategory: {
            code: "MC_001",
            name: "서빙"
          },
          missionInfo: {
            title: "미션 제목",
            missionDate: "2023-10-30",
            startTime: "12:00",
            endTime: "18:00",
            price: 30000
          },
          imagePath: "s3://image"
        }
      },
      {
        id: 5,
        mission: {
          id: 5,
          citizenId: 1,
          status: "EXPIRED",
          bookmarkCount: 5,
          isBookmarked: true,
          createdAt: "2023-11-26T13:44:35",
          region: {
            si: "서울시",
            gu: "프로구",
            dong: "래머동"
          },
          missionCategory: {
            code: "MC_001",
            name: "서빙"
          },
          missionInfo: {
            title: "미션 제목",
            missionDate: "2023-10-30",
            startTime: "12:00",
            endTime: "18:00",
            price: 30000
          },
          imagePath: "s3://image"
        }
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    size: 5,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    first: true,
    last: false,
    numberOfElements: 5,
    empty: false
  },
  serverDateTime: "2023-11-29T13:44:35"
};

export const completedMissionList: ProgressMissionListResponse = {
  status: 200,
  data: {
    content: [
      {
        id: 1,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 2,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 3,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 4,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 5,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 6,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 7,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 8,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      },
      {
        id: 9,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        missionDate: "2023-11-06",
        bookmarkCount: 1,
        missionStatus: "MISSION_COMPLETED"
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 4,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    size: 4,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    first: true,
    last: true,
    numberOfElements: 1,
    empty: false
  },
  serverDateTime: "2023-11-13T15:26:37"
};

export const matchingMissionList: SuggestingMissionListResponse = {
  status: 200,
  data: {
    missionMatchingResponses: [
      {
        id: 1,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        region: {
          id: 1,
          si: "서울시",
          gu: "강남구",
          dong: "역삼동"
        },
        missionCreatedAt: "2023-11-03T12:00:00",
        missionDate: "2023-11-06",
        startTime: "12:00",
        endTime: "18:00",
        price: 20000,
        bookmarkCount: 1,
        missionStatus: "MATCHING",
        imagePath: "s3://path",
        isBookmarked: true
      },
      {
        id: 2,
        title: "제목",
        missionCategory: {
          id: 1,
          code: "MC_001",
          name: "서빙"
        },
        region: {
          id: 1,
          si: "서울시",
          gu: "강남구",
          dong: "역삼동"
        },
        missionCreatedAt: "2023-10-29T12:00:00",
        missionDate: "2023-11-06",
        startTime: "12:00",
        endTime: "18:00",
        price: 20000,
        bookmarkCount: 1,
        missionStatus: "MATCHING",
        imagePath: "s3://path",
        isBookmarked: true
      }
    ]
  },
  serverDateTime: "2023-11-26T20:05:40"
};

export const proposalDetail: ProposalResponse = {
  status: 201,
  data: {
    id: 1,
    missionId: 1,
    heroId: 1,
    missionProposalStatus: "PROPOSAL"
  },
  serverDateTime: "2023-11-16T16:08:24"
};
