import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { safeEditReviewFetch } from "@/services/review";
import { getServerToken } from "@/utils/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = getServerToken() ?? "";
  const reviewId = parseInt(params.slug);

  const data = await request.formData();

  const { isError, response: postResponse } = await safeEditReviewFetch(
    reviewId,
    data,
    token
  );

  if (isError || !postResponse) {
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
