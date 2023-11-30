import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";
import { safeEditProfileFetch } from "@/services/users";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const formData = await request.formData();

  const { mutationalFetch } = safeEditProfileFetch();

  const { isError, response, errorMessage } = await mutationalFetch({
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (isError || !response) {
    console.log(errorMessage);
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
