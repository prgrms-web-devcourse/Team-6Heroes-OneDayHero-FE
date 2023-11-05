import { UserResponse } from "@/types/response";

export const userDetail: UserResponse = {
  status: 200,
  data: {
    userId: 1,
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
  serverDateTime: "2023-11-02T14:25:45"
};
