import { z } from "zod";

export const MandatorySurveySchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "프로필 이미지를 선택해 주세요."),
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

export const PostProposalSchema = z.object({
  userId: z.number(),
  missionId: z.number(),
  heroId: z.number()
});
