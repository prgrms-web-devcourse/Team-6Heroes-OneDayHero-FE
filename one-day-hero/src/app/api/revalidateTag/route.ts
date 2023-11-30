import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  (data.tag as string[]).forEach((tagItem) => {
    revalidateTag(tagItem);
  });

  return NextResponse.json(
    {
      status: 200,
      data: {
        tag: data.tag
      }
    },
    { status: 200 }
  );
}
