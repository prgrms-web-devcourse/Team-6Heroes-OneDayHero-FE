import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { categoryId, missionInfo } = await request.json();

  console.log("categoryId:", categoryId);
  console.log("missionInfo:", missionInfo);

  return NextResponse.json(missionInfo, { status: 201 });
}
