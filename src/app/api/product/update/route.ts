/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });
    }

    const data = await req.json();
    const { id, variants, ...productData } = data;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date(),
        variants: {
          deleteMany: {},
          create: variants.map((v: any) => ({
            flavor: v.flavor,
            amount: v.amount,
            unitType: v.unitType,
            price: parseFloat(v.price),
            inStock: v.inStock,
            discount: parseFloat(v.discount || "0"),
            isMain: v.isMain || false,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (err) {
    console.error("Помилка при створенні товару:", err);
    return NextResponse.json({ error: "Помилка серверу" }, { status: 500 });
  }
}
