import { type NextRequest, NextResponse } from "next/server";

import { userDetail } from "../../_data/user";

export function PATCH(request: NextRequest) {
  return NextResponse.json(userDetail, { status: 200 });
}
