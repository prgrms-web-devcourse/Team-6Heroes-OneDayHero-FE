import { UserResponse } from "@/types/response";

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
    heroScore: 60
  },
  serverDateTime: "2023-11-13T15:26:37"
};
