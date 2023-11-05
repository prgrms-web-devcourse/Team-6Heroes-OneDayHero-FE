import { NextResponse } from "next/server";

import { suggestedMissionList } from "@/app/api/v1/mock/_data/mission";

export function GET() {
  return NextResponse.json(suggestedMissionList, { status: 200 });
}
