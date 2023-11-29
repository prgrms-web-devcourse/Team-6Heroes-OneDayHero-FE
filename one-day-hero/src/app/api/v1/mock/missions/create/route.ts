import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { categoryId, missionInfo } = await request.json();
  return NextResponse.json(missionInfo, { status: 201 });
}
