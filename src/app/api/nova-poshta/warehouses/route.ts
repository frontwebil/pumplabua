import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cityRef, type } = await req.json();

  const data: any = {
    apiKey: process.env.NOVA_POSHTA_API_KEY,
    modelName: "Address",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityRef: cityRef,
    },
  };

  // ✅ Якщо поштомати
  if (type === "postomat") {
    data.methodProperties.TypeOfWarehouseRef =
      "f9316480-5f2d-425d-bc2c-ac7cd29decf0";
  }

  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  return NextResponse.json(json.data);
}
