import { MissionSearchListResponse } from "@/types/response";

export const MissionSearchList: MissionSearchListResponse = {
  status: 200,
  data: {
    content: [
      {
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
        longitude: 127.02880308004335,
        latitude: 37.49779692073204,
        missionInfo: {
          title: "제목",
          content: "내용",
          missionDate: "2023-10-21",
          startTime: "09:00",
          endTime: "09:30",
          deadlineTime: "2023-10-21T08:30:00",
          price: 1000
        },
        bookmarkCount: 0,
        missionStatus: "MATCHING",
        paths: ["path://1", "path://2"],
        isBookmarked: true
      },
      {
        id: 2,
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
        longitude: 127.02880308004335,
        latitude: 37.49779692073204,
        missionInfo: {
          title: "제목",
          content: "내용",
          missionDate: "2023-10-22",
          startTime: "09:00",
          endTime: "09:30",
          deadlineTime: "2023-10-22T08:30:00",
          price: 1000
        },
        bookmarkCount: 0,
        missionStatus: "MATCHING",
        paths: ["path://3", "path://4"],
        isBookmarked: true
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
    numberOfElements: 2,
    empty: false
  },
  serverDateTime: "2023-11-29T13:44:34"
};
