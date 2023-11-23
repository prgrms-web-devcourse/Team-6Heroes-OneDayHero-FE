import { type NextRequest, NextResponse } from "next/server";

import { receiveReview } from "./../../../_data/review/index";

export function GET(request: NextRequest) {
  return NextResponse.json(receiveReview, { status: 200 });
}
