import { type NextRequest, NextResponse } from "next/server";

import { progessMissionList } from "../../../_data/mission";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const sort = searchParams.get("sort");

  return NextResponse.json(progessMissionList, { status: 200 });
}
