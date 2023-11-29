import { type NextRequest, NextResponse } from "next/server";

import { ProgressMissionListResponse } from "@/types/response";

import { completedMissionList } from "../../../_data/mission";

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
    ...completedMissionList,
    data: {
      ...completedMissionList.data,
      content: completedMissionList.data.content.slice(
        page * size,
        (page + 1) * size
      ),
      last: (page + 1) * size >= completedMissionList.data.content.length
    }
  };

  return NextResponse.json(responseList, { status: 200 });
}
