import { type NextRequest, NextResponse } from "next/server";

import { missionDetail } from "../../_data/mission";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const missionId = params.slug;

  return NextResponse.json(missionDetail, { status: 200 });
}
