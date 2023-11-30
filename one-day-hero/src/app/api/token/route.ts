import { NextRequest, NextResponse } from "next/server";

import { safePostAuthCodeFetch } from "@/services/auth";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  const { mutationalFetch } = safePostAuthCodeFetch();

  const {
    isError,
    errorMessage,
    response: tokenResponse
  } = await mutationalFetch({
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  if (isError || !tokenResponse) {
    console.log(errorMessage);
    return new NextResponse(null, {
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
