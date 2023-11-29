import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";
import { useEditReviewFetch } from "@/services/review";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = getServerToken();

  const data = await request.formData();

  const { mutationalFetch } = useEditReviewFetch(parseInt(params.slug));

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
