import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("Помилка при створенні товару:", err);
    return NextResponse.json({ error: "Помилка серверу" }, { status: 500 });
  }
}
