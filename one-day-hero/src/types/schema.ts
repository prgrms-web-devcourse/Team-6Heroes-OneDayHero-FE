import { z } from "zod";

export const MandatorySurveySchema = z.object({
  image: z.array(
    z.object({
      file: z.any(),
      id: z.string()
    })
  ),
  nickName: z
    .string()
    .refine(
      (name) => name.length > 2 && name.length < 11,
      "3~10자 길이의 닉네임을 생성해 주세요."
    ),
  introduction: z
    .string()
    .refine(
      (intro) => intro.length > 10,
      "10글자 이상의 자기소개를 작성해 주세요."
    )
});

export type MandatorySurveySchemaProps = z.infer<typeof MandatorySurveySchema>;

export const OptionalSurveySchema = z.object({
  favoriteWorkingDay: z
    .object({
      favoriteDate: z.array(z.string()).optional(),
      favoriteStartTime: z.string().optional(),
      favoriteEndTime: z.string().optional()
    })
    .optional(),
  favoriteRegions: z.array(z.number()).max(5).optional()
});

export type OptionalSurveySchemaProps = z.infer<typeof OptionalSurveySchema>;

export const PatchSurveySchema = z.object({
  userId: z.number().optional(),
  basicInfo: z
    .object({
      nickname: z.string().optional(),
      gender: z.string().optional(),
      birth: z.string().optional(),
      introduce: z.string().optional()
    })
    .optional(),
  favoriteWorkingDay: z
    .object({
      favoriteDate: z
        .enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])
        .array()
        .optional(),
      favoriteStartTime: z.string().optional(),
      favoriteEndTime: z.string().optional()
    })
    .optional(),
  favoriteRegions: z.array(z.number()).max(5).optional()
});

export const PostMissionSchema = z.object({
  missionCategoryId: z.number(),
  citizenId: z.number(),
  regionId: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  missionInfo: z.object({
    title: z.string(),
    content: z.string(),
    missionDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    deadlineTime: z.string(),
    price: z.number()
  })
});

export const MissionSearchFilterSchema = z.object({
  categoryId: z.string().optional(),
  dongId: z.string().optional()
});

export type MissionSearchFilterSchemaProps = z.infer<
  typeof MissionSearchFilterSchema
>;
export const PostProposalSchema = z.object({
  userId: z.number(),
  missionId: z.number(),
  heroId: z.number()
});

export const ReviewFormSchema = z.object({
  senderId: z.number().optional(),
  receiverId: z.number().optional(),
  categoryId: z.number().optional(),
  missionId: z.number().optional(),
  missionTitle: z.string().optional(),
  content: z
    .string()
    .refine((content) => content.length > 10, "10글자 이상 작성해주세요."),
  starScore: z.number().refine((score) => score > 0, "별점을 작성해주세요!")
});

const currentDate = new Date().toISOString().split("T")[0];

export const MissionFormSchema = z.object({
  missionCategoryId: z
    .number()
    .refine((id) => id > 0 && id < 9, "카테고리를 선택해주세요!"),
  regionName: z
    .string()
    .refine((region) => region.length > 0, "미션 지역을 선택해주세요!"),
  latitude: z.number().refine((lat) => {
    if (lat === undefined || lat === null) {
      return false;
    }
    return true;
  }, "미션 지역을 선택해주세요!"),
  longitude: z.number().refine((lng) => {
    if (lng === undefined || lng === null) {
      return false;
    }
    return true;
  }, "미션 지역을 선택해주세요!"),
  missionInfo: z.object({
    title: z
      .string()
      .refine((title) => title.length > 2, "제목을 3글자 이상 입력해주세요!"),
    content: z
      .string()
      .refine(
        (content) => content.length > 9,
        "미션 내용을 10글자 이상 입력해주세요!"
      ),
    missionDate: z
      .string()
      .refine((date) => date >= currentDate, "생성할 수 없는 날짜입니다!")
      .refine((date) => date.length > 0, "미션 날짜를 입력해주세요!"),
    startTime: z
      .string()
      .refine((time) => time.length > 0, "시작 시간을 설정해주세요!"),
    endTime: z
      .string()
      .refine((time) => time.length > 0, "마감 시간을 설정해주세요!"),
    price: z
      .number()
      .min(1000, "포상금을 1000 이상의 값으로 입력해주세요!")
      .refine((price) => price > 0, "포상금을 입력해주세요!")
  })
});
