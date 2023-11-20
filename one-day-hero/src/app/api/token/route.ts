import { NextRequest, NextResponse } from "next/server";

import { usePostAuthCodeFetch } from "@/services/auth";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  const { mutationalFetch } = usePostAuthCodeFetch();

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
      status: 400
    });
  }

  const response = new NextResponse(null, {
    status: 200
  });

  response.cookies.set("token", tokenResponse.token);

  return response;
}