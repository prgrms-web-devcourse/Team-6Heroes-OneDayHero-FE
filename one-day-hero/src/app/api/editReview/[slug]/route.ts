import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { useEditReviewFetch } from "@/services/review";
import { getServerToken } from "@/utils/auth";

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
    return NextResponse.json(postResponse ?? {}, {
      status: 400
    });
  }

  revalidateTag(`review${params.slug}`);

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
