import { NextRequest, NextResponse } from "next/server";

import { Response } from "@/app/mission/create/page";

export async function POST(request: NextRequest) {
  const {
    missionInfo,
    missionCategoryId,
    citizenId,
    regionId,
    latitude,
    longitude
  } = await request.json();

  const formatData: Response = {
    data: {
      id: 1,
      missionCategory: {
        categoryId: missionCategoryId,
        code: "MC_001",
        name: "서빙"
      },
      citizenId,
      regionId,
      location: {
        x: latitude,
        y: longitude
      },
      missionInfo,
      bookmarkCount: 0,
      missionStatus: "MATCHING"
    }
  };

  return NextResponse.json(formatData, { status: 201 });
}
