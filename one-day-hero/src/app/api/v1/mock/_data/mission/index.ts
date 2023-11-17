import {
  MissionResponse,
  OngoingMissionListResponse,
  ProgressMissionListResponse,
  SuggestedMissionListResponse
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
    response: {
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
    }
  },
  serverDateTime: "2023-11-13T15:26:37"
};

export const ongoingMissionList: OngoingMissionListResponse = {
  status: 200,
  data: [
    {
      id: 1,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 15,
      region: {
        id: 1,
        si: "서울시",
        gu: "마포구",
        dong: "동교동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "더미 데이터 제목입니다.",
        content: "내용1",
        missionDate: "2023-12-4",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 5,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 2,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 11,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목11",
        content: "내용11",
        missionDate: "2023-12-18",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 3,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목111",
        content: "내용111",
        missionDate: "2023-11-27",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 270000
      },
      bookmarkCount: 7,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 4,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목2",
        content: "내용2",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 160000
      },
      bookmarkCount: 12,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 2,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목3",
        content: "내용3",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 110000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 6,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 3,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목4",
        content: "내용4",
        missionDate: "2023-11-6",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 130000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 4,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목5",
        content: "내용5",
        missionDate: "2023-11-15",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 100000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "EXPIRED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 7,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 5,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목6",
        content: "내용6",
        missionDate: "2023-11-26",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 1000
      },
      bookmarkCount: 5,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    }
  ],
  serverDateTime: "2023-11-02T14:25:44"
};

export const suggestedMissionList: SuggestedMissionListResponse = {
  status: 200,
  data: [
    {
      id: 1,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 15,
      region: {
        id: 1,
        si: "서울시",
        gu: "마포구",
        dong: "동교동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "더미 데이터 제목입니다.",
        content: "내용1",
        missionDate: "2023-12-4",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 5,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 2,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 11,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목11",
        content: "내용11",
        missionDate: "2023-12-18",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 3,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목111",
        content: "내용111",
        missionDate: "2023-11-27",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 270000
      },
      bookmarkCount: 7,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 4,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목2",
        content: "내용2",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 160000
      },
      bookmarkCount: 12,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 2,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목3",
        content: "내용3",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 110000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 6,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 3,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목4",
        content: "내용4",
        missionDate: "2023-11-6",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 130000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 4,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목5",
        content: "내용5",
        missionDate: "2023-11-15",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 100000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "EXPIRED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 7,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 5,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목6",
        content: "내용6",
        missionDate: "2023-11-26",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 1000
      },
      bookmarkCount: 5,

      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    }
  ],
  serverDateTime: "2023-11-02T14:25:44"
};

export const completedMissionList: SuggestedMissionListResponse = {
  status: 200,
  data: [
    {
      id: 1,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 15,
      region: {
        id: 1,
        si: "서울시",
        gu: "마포구",
        dong: "동교동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "더미 데이터 제목입니다.",
        content: "내용1",
        missionDate: "2023-12-4",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 5,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 2,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 11,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목11",
        content: "내용11",
        missionDate: "2023-12-18",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 3,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목111",
        content: "내용111",
        missionDate: "2023-11-27",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 270000
      },
      bookmarkCount: 7,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 4,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
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
        title: "제목2",
        content: "내용2",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 160000
      },
      bookmarkCount: 12,
      isBookmarked: true,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 2,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목3",
        content: "내용3",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 110000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 6,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 3,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목4",
        content: "내용4",
        missionDate: "2023-11-6",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 130000
      },
      bookmarkCount: 2,
      isBookmarked: true,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 4,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목5",
        content: "내용5",
        missionDate: "2023-11-15",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 100000
      },
      bookmarkCount: 0,
      isBookmarked: true,
      missionStatus: "EXPIRED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 7,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 5,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      longitude: 1234277.388,
      latitude: 1234252.23,
      missionInfo: {
        title: "제목6",
        content: "내용6",
        missionDate: "2023-11-26",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 1000
      },
      bookmarkCount: 5,
      isBookmarked: true,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    }
  ],
  serverDateTime: "2023-11-02T14:25:44"
};
