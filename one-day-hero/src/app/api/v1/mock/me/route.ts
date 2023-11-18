import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { userSummary } from "../_data/user";

const userPatchSchema = z.object({
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

export async function PATCH(request: NextRequest) {
  const userPatchData = await request.json();

  const result = userPatchSchema.safeParse(userPatchData);

  if (!result.success) {
    return new NextResponse("Error", { status: 400 });
  }

  return NextResponse.json(userSummary, { status: 200 });
}
