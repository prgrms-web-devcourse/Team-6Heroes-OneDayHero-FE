import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";
import { safeCreateMissionFetch } from "@/services/missions";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const data = await request.formData();

  const { mutationalFetch } = safeCreateMissionFetch();

  const {
    isError,
    errorMessage,
    response: postResponse
  } = await mutationalFetch({
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  });

  if (isError || !postResponse) {
    console.log(errorMessage);
    return NextResponse.json(postResponse ?? {}, {
      status: 400
    });
  }

  revalidateTag("progress");
  revalidateTag("matching");

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
