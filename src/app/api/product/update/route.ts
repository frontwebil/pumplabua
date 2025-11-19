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

    // Видаляємо поля які не треба оновлювати
    delete productData.createdAt;
    delete productData.updatedAt;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date(),
        variants: {
          deleteMany: {}, // Видаляємо всі старі варіанти
          create: variants.map((v: any) => ({
            flavor: v.flavor || null,
            amount: parseFloat(v.amount), // ⬅️ Перетворюємо на число
            unitType: v.unitType,
            price: parseFloat(v.price),
            inStock: v.inStock,
            discount: v.discount ? parseFloat(v.discount) : 0,
            isMain: v.isMain || false,
            images: v.images || [], // ⬅️ Додай дефолтне значення
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (err) {
    console.error("Помилка при оновленні товару:", err);
    return NextResponse.json(
      { error: "Помилка серверу", details: (err as Error).message },
      { status: 500 }
    );
  }
}
