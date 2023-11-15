import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { userSummary } from "../_data/user";

const userPatchSchema = z.object({
  userId: z.number(),
  basicInfo: z.object({
    nickname: z.string(),
    gender: z.string(),
    birth: z.string(),
    introduce: z.string()
  }),
  favoriteWorkingDay: z.object({
    favoriteDate: z
      .enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])
      .array(),
    favoriteStartTime: z.string(),
    favoriteEndTime: z.string()
  })
});

export async function PATCH(request: NextRequest) {
  const userPatchData = await request.json();

  const result = userPatchSchema.safeParse(userPatchData);

  if (!result.success) {
    return new NextResponse("Error", { status: 400 });
  }

  return NextResponse.json(userSummary, { status: 200 });
}
