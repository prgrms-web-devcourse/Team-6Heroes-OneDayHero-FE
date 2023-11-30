import { NextRequest, NextResponse } from "next/server";

import { safePostAuthCodeFetch } from "@/services/auth";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  const { isError, response: tokenResponse } =
    await safePostAuthCodeFetch(code);

  if (isError || !tokenResponse) {
    return NextResponse.json(tokenResponse ?? {}, {
      status: tokenResponse?.status ?? 400
    });
  }

  const response = new NextResponse(
    JSON.stringify({ userId: tokenResponse.data.userId }),
    {
      status: tokenResponse.status
    }
  );

  response.cookies.set("token", tokenResponse.data.accessToken);
  response.cookies.set("userId", tokenResponse.data.userId.toString());

  return response;
}
