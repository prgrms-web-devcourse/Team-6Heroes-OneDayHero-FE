import { type NextRequest, NextResponse } from "next/server";

import { ProgressMissionListResponse } from "@/types/response";

import { progessMissionList } from "../../../_data/mission";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "0");
  const sort = searchParams.get("sort");

  const responseList: ProgressMissionListResponse = {
    ...progessMissionList,
    data: {
      ...progessMissionList.data,
      content: progessMissionList.data.content.slice(
        page * size,
        (page + 1) * size
      ),
      last: (page + 1) * size >= progessMissionList.data.content.length
    }
  };

  return NextResponse.json(responseList, { status: 200 });
}
