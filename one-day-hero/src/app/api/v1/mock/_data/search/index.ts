import { MissionSearchListResponse } from "@/types/response";

export const MissionSearchList: MissionSearchListResponse = {
  status: 200,
  data: {
    content: [
      {
        id: 1,
        mission: {
          id: 1,
          status: "MATCHING",
          bookmarkCount: 5,
          createdAt: "2023-11-16T16:08:24",
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
          }
        }
      },
      {
        id: 2,
        mission: {
          id: 2,
          status: "MATCHING",
          bookmarkCount: 5,
          createdAt: "2023-11-15T16:08:24",
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
          }
        }
      },
      {
        id: 3,
        mission: {
          id: 3,
          status: "MATCHING_COMPLETED",
          bookmarkCount: 5,
          createdAt: "2023-11-13T16:08:24",
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
          }
        }
      },
      {
        id: 4,
        mission: {
          id: 4,
          status: "MISSION_COMPLETED",
          bookmarkCount: 5,
          createdAt: "2023-11-14T16:08:24",
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
          }
        }
      },
      {
        id: 5,
        mission: {
          id: 5,
          status: "EXPIRED",
          bookmarkCount: 5,
          createdAt: "2023-11-13T16:08:24",
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
          }
        }
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    numberOfElements: 5,
    first: true,
    last: false,
    size: 5,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    empty: false
  },
  serverDateTime: "2023-11-16T16:08:24"
};
