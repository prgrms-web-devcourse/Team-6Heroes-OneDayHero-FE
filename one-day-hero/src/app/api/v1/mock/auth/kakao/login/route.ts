import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  return NextResponse.json(
    {
      status: 200,
      token: "asdf",
      serverDateTime: "2023-11-13T15:26:38"
    },
    {
      status: 200
    }
  );
}
