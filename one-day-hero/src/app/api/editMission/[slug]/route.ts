import { NextRequest, NextResponse } from "next/server";

import { safeEditMissionFetch } from "@/services/missions";
import { getServerToken } from "@/utils/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = getServerToken() ?? "";

  const data = await request.formData();

  const { isError, response: postResponse } = await safeEditMissionFetch(
    parseInt(params.slug),
    data,
    token
  );

  if (isError || !postResponse) {
    return new NextResponse(null, {
      status: 400
    });
  }

  return NextResponse.json(
    {
      status: 201,
      data: {
        id: postResponse.data.id
      },
      serverDateTime: "2023-11-22T23:31:20"
    },
    { status: 201 }
  );
}
