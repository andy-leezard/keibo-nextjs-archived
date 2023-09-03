import data from "../list.json"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const crypto:
    | {
        value: string
        symbol: string
        display_name: string
        image: string
      }
    | undefined = data.find((w) => w.value === id)
  if (!crypto || !id || typeof id !== "string") {
    return new Response(JSON.stringify({ error: "Invalid crypto id" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
  return new Response(JSON.stringify({ crypto }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  })
}
