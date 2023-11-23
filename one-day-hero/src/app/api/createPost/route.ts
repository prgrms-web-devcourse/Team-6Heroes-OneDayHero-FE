import { NextRequest, NextResponse } from "next/server";

import { getServerToken } from "@/app/utils/auth";
import { useCreateMissionFetch } from "@/services/missions";
import { ImageFileType } from "@/types";

export async function POST(request: NextRequest) {
  const token = getServerToken();

  const { data, images } = await request.json();

  const formData = new FormData();

  const jsonData = JSON.stringify(data);

  formData.append(
    "missionCreateRequest",
    new Blob([jsonData], { type: "application/json" })
  );

  if (images) {
    images?.forEach((image: ImageFileType) => {
      const imageBlob = new Blob([image.file], { type: "image/jpeg" });
      formData.append(`multipartFiles`, imageBlob, "image.jpg");
    });
  }

  const { mutationalFetch } = useCreateMissionFetch();

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
      body: formData
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
