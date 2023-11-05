import { type NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const data = request.json();

  const response = {
    status: 200,
    data: {
      id: 1,
      ...data
    },
    serverDateTime: "2023-11-02T14:25:44"
  };

  return NextResponse.json(response, { status: 200 });
}

export function DELETE(request: NextRequest) {
  const data = request.json();

  const response = {
    status: 200,
    data: {
      id: 1,
      ...data
    },
    serverDateTime: "2023-11-02T14:25:44"
  };

  return NextResponse.json(response, { status: 200 });
}
