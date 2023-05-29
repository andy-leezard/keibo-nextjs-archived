import data from "./list.json"
import { NextApiRequest, NextApiResponse } from "next"

export const runtime = "edge"

function toPositiveInt(str: string | null) {
  if (str === null) return null
  const num = parseInt(str, 10)
  if (isNaN(num)) return null
  return num
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Artificially delay a reponse for demo purposes.
  // Remind me not to do this in production
  const delay = searchParams.get("delay")
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)))
  }

  const page = toPositiveInt(searchParams.get("page"))
  if (typeof page === "number") {
    const start = page ? page - 1 : 0
    const category = data.slice(start * 5, (start + 1) * 5)
    return new Response(JSON.stringify(category), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    })
  }
  return new Response(JSON.stringify(data.slice(0, 5)), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  })
}
