import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";
import { useEditProfileFetch } from "@/services/users";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const formData = await request.formData();

  console.log("response 확인", formData);

  // const formData = new FormData();

  // formData.append(
  //   "userUpdateRequest",
  //   new Blob([jsonData], { type: "application/json" })
  // );

  // formData.append(
  //   "images",
  //   new Blob([file], { type: "image/jpeg" }),
  //   file[0].file.name
  // );

  const { mutationalFetch } = useEditProfileFetch();

  const { isError, response, errorMessage } = await mutationalFetch(
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    () => {
      console.log("post 완료");
      // router.push("/survey/optional");
    }
  );

  if (isError || !response) {
    console.log(errorMessage);
    return new NextResponse(null, {
      status: 400
    });
  }
}
