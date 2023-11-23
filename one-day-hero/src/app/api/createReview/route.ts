import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";

import { usePostCreateReviewFetch } from "./../../../services/review";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const data = await request.formData();

  const { mutationalFetch } = usePostCreateReviewFetch();

  const {
    isError,
    errorMessage,
    response: postResponse
  } = await mutationalFetch(
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    },
    (response) => {
      console.log(response);
    }
  );

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
