import { NextRequest, NextResponse } from "next/server";

import { matchingMissionList } from "@/app/api/v1/mock/_data/mission";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json(matchingMissionList, { status: 200 });
}
