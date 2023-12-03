import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { safeEditProfileFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const token = getServerToken() ?? "";

  const data = await request.formData();

  const { isError, response } = await safeEditProfileFetch(data, token);

  if (isError || !response) {
    return NextResponse.json(response ?? {}, {
      status: 400
    });
  }

  revalidateTag("user");

  return NextResponse.json(
    {
      status: 201,
      serverDateTime: "2023-11-22T23:31:20"
    },
    { status: 201 }
  );
}
