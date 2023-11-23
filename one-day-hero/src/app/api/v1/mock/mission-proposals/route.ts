import { NextRequest, NextResponse } from "next/server";

import {
  proposalDetail,
  suggestedMissionList
} from "@/app/api/v1/mock/_data/mission";
import { PostProposalSchema } from "@/types/schema";

export function GET() {
  return NextResponse.json(suggestedMissionList, { status: 200 });
}

export async function POST(request: NextRequest) {
  const missionPostData = await request.json();

  const result = PostProposalSchema.safeParse(missionPostData);

  if (!result.success) {
    return new NextResponse("Error", { status: 400 });
  }

  return NextResponse.json(proposalDetail, { status: 201 });
}
