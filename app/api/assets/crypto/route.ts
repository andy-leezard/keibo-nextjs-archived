import { toPositiveInt } from "@/utils/server"
import data from "./list.json"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let output = data
  const keyword = searchParams.get("keyword")
  if (keyword) {
    output = output.filter((c) => {
      //const display_name = Object.values(c.display_name).join(" ")
      return c.display_name.includes(keyword) || c.symbol.includes(keyword)
    })
  }
  const size = toPositiveInt(searchParams.get("size"), 5)
  const page = toPositiveInt(searchParams.get("page"), 0)
  output = output.slice(page * size, (page + 1) * size)
  const message = {
    metadata: {
      page_ended: output.length < size,
    },
    data: output,
  }
  return new Response(JSON.stringify(message), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  })
}
