import { type NextRequest, NextResponse } from "next/server";

import { reviewDetail } from "../../_data/review";

export function GET(request: NextRequest) {
  return NextResponse.json(reviewDetail, { status: 200 });
}

export function DELETE(request: NextRequest) {
  const response = {
    status: 204,
    data: null,
    serverDateTime: "2023-11-16T16:08:24"
  };

  return NextResponse.json(response, { status: 204 });
}
