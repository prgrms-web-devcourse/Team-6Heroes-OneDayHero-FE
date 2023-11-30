import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { useCreateMissionFetch } from "@/services/missions";
import { getServerToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const data = await request.formData();

  const { mutationalFetch } = useCreateMissionFetch();

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
