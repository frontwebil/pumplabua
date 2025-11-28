import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { city } = await req.json();

  const data = {
    apiKey: process.env.NOVA_POSHTA_API_KEY,
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: city,
      Limit: 10,
    },
  };

  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  console.log("NOVA API RAW:", json); // 👈 ДЛЯ ДЕБАГУ

  return NextResponse.json(json.data[0]);
}
