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
