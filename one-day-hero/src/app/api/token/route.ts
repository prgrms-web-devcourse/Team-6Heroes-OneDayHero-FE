import { NextRequest, NextResponse } from "next/server";

import { usePostAuthCodeFetch } from "@/services/auth";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  const { mutationalFetch } = usePostAuthCodeFetch();

  const { isError, response: tokenResponse } = await mutationalFetch({
    method: "POST",
    body: JSON.stringify({ code })
  });

  if (isError || !tokenResponse) {
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
