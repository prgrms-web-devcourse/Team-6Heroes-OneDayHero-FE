export async function GET(req: Request) {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    return new Response(
      JSON.stringify({
        message: "mock test!"
      }),
      {
        status: 202,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    );
  }
  else {
    // 실제 백엔드 요청 넣는 위치
    console.log("env error");
  }
}