export async function GET(req: Request) {
  return new Response(
    JSON.stringify({
      message: "mock test!"
    }),
    {
      status: 202,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  );
}
