import { NextResponse } from "next/server";

import { ongoingMissionList } from "@/app/api/v1/mock/_data/mission";

export function GET() {
  return NextResponse.json(ongoingMissionList, { status: 200 });
}
