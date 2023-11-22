import { NextRequest, NextResponse } from "next/server";

import { userDetail } from "../../_data/user";

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const heroId = params.slug;

  return NextResponse.json(userDetail, { status: 200 });
}
