import { type NextRequest, NextResponse } from "next/server";

import { sendReview } from "./../../../_data/review/index";
export function GET(request: NextRequest) {
  return NextResponse.json(sendReview, { status: 200 });
}
