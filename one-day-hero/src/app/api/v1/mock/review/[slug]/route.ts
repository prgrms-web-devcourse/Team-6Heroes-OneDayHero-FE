import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { reviewDetail } from "../../_data/review";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json(reviewDetail, { status: 200 });
}
