import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { missionDetail } from "../_data/mission";

const missionPostSchema = z.object({
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

export async function POST(request: NextRequest) {
  const missionPostData = await request.json();

  const result = missionPostSchema.safeParse(missionPostData);

  if (!result.success) {
    return new NextResponse("Error", { status: 400 });
  }

  return NextResponse.json(missionDetail, { status: 201 });
}
