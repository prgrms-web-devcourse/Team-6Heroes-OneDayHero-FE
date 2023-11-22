import { type NextRequest, NextResponse } from "next/server";

import { SuggestedMissionListResponse } from "@/types/response";

import { suggestedMissionList } from "../_data/mission";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "0");
  const sort = searchParams.get("sort");

  const responseList: SuggestedMissionListResponse = {
    ...suggestedMissionList,
    data: {
      ...suggestedMissionList.data,
      content: suggestedMissionList.data.content.slice(
        page * size,
        (page + 1) * size
      ),
      last: (page + 1) * size >= suggestedMissionList.data.content.length
    }
  };

  return NextResponse.json(responseList, { status: 200 });
}
