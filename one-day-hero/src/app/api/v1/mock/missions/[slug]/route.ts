import { missionDetail } from "@/app/api/v1/mock/_data/mission";
import { type NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const missionId = params.slug;

  return NextResponse.json(missionDetail, { status: 200 });
}
