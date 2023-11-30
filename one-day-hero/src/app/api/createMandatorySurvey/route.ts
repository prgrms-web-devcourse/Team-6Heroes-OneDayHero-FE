import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { useEditProfileFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const formData = await request.formData();

  const { mutationalFetch } = useEditProfileFetch();

  const { isError, response, errorMessage } = await mutationalFetch(
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    (response) => {
      console.log(response);
    }
  );

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
