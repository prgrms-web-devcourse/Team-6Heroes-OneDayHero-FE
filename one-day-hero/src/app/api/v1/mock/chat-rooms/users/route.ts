import { type NextRequest, NextResponse } from "next/server";

import { chattingList } from "../../_data/chatting";

export function GET(request: NextRequest) {
  return NextResponse.json(chattingList, { status: 200 });
}
