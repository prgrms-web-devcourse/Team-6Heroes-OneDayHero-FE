import { NextResponse } from "next/server";

import { completedMissionList } from "@/app/api/v1/mock/_data/mission";

export function GET() {
  return NextResponse.json(completedMissionList, { status: 200 });
}
