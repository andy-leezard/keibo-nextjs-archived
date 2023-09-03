import data from "../data"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const provider_id = searchParams.get("provider_id")
  const provider = data.find((w) => w.value === provider_id)
  if (!provider || !provider_id || typeof provider_id !== "string") {
    return new Response(JSON.stringify({ error: "Invalid provider id" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
  return new Response(JSON.stringify({ provider }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  })
}
