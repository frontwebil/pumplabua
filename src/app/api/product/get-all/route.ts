import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });
    }

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
