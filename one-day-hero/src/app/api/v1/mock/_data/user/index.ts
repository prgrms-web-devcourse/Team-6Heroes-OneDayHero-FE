import { UserResponse, UserSummaryResponse } from "@/types/response";

export const userDetail: UserResponse = {
  status: 200,
  data: {
    basicInfo: {
      nickname: "이름",
      gender: "MALE",
      birth: "1990-01-01",
      introduce: "자기 소개"
    },
    image: {
      originalName: "profile.jpg",
      uniqueName: "unique.jpg",
      path: "http://"
    },
    favoriteWorkingDay: {
      favoriteDate: ["MON", "THU"],
      favoriteStartTime: "12:00",
      favoriteEndTime: "18:00"
    },
    favoriteRegions: [
      {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      {
        id: 2,
        si: "서울시",
        gu: "강남구",
        dong: "청담동"
      }
    ],
    heroScore: 60,
    isHeroMode: true
  },
  serverDateTime: "2023-11-13T15:26:38"
};

export const userSummary: UserSummaryResponse = {
  status: 200,
  data: {
    id: 1,
    basicInfo: {
      nickname: "이름",
      gender: "MALE",
      birth: "1990-01-01",
      introduce: "자기소개"
    },
    favoriteWorkingDay: {
      favoriteDate: ["MON", "THU"],
      favoriteStartTime: "12:00",
      favoriteEndTime: "18:00"
    }
  },
  serverDateTime: "2023-11-13T15:26:38"
};
