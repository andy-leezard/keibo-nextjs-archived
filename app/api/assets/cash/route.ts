import { toPositiveInt } from "@/utils/server"

export const runtime = "edge"

const data = [
  {
    value: "usd",
    symbol: "usd",
    quantity: 0,
    display_name: { en: "US Dollar", fr: "Dollar américain", ko: "미국 달러" },
  },
  {
    value: "eur",
    symbol: "eur",
    quantity: 0,
    display_name: { en: "Euro", ko: "유럽연합 유로" },
  },
  {
    value: "chf",
    symbol: "chf",
    quantity: 0,
    display_name: {
      en: "Swiss Franc",
      fr: "Franc suisse",
      ko: "스위스 프랑",
    },
  },
  {
    value: "gbp",
    symbol: "gbp",
    quantity: 0,
    display_name: {
      en: "British Pound Sterling",
      fr: "Livre sterling britannique",
      ko: "영국 파운드",
    },
  },
  {
    value: "jpy",
    symbol: "jpy",
    quantity: 0,
    display_name: { en: "Japan Yen", fr: "Yen japonais", ko: "일본 엔화" },
  },
  {
    value: "rub",
    symbol: "rub",
    quantity: 0,
    display_name: {
      en: "Russian ruble",
      fr: "Rouble russe",
      ko: "러시아 루블",
    },
  },
  {
    value: "krw",
    symbol: "krw",
    quantity: 0,
    display_name: { en: "Korean won", fr: "Won coréen", ko: "대한민국 원화" },
  },
  {
    value: "cny",
    symbol: "cny",
    quantity: 0,
    display_name: {
      en: "Chinese yuan",
      fr: "Yuan chinois",
      ko: "중국 위안화",
    },
  },
  {
    value: "cad",
    symbol: "cad",
    quantity: 0,
    display_name: {
      en: "Canadian Dollar",
      fr: "Dollar canadien",
      ko: "캐나다 달러",
    },
  },
  {
    value: "inr",
    symbol: "inr",
    quantity: 0,
    display_name: {
      en: "Indian Rupee",
      fr: "roupie indienne",
      ko: "인도 루피",
    },
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let output = data
  const keyword = searchParams.get("keyword")
  if (keyword) {
    output = output.filter((c) => {
      const display_name = Object.values(c.display_name).join(" ")
      return display_name.includes(keyword) || c.symbol.includes(keyword)
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
