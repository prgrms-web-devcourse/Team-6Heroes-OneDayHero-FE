import { NextRequest, NextResponse } from "next/server";

import { PostMissionSchema } from "@/types/schema";

import { missionDetail } from "../_data/mission";

export async function POST(request: NextRequest) {
  const missionPostData = await request.json();

  const result = PostMissionSchema.safeParse(missionPostData);

  if (!result.success) {
    return new NextResponse("Error", { status: 400 });
  }

  return NextResponse.json(missionDetail, { status: 201 });
}
