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
    const { variants, ...rest } = await req.json();

    const product = await prisma.product.create({
      data: {
        ...rest,
        variants: {
          create: variants.map((v: any) => ({
            ...v,
            amount: parseFloat(v.amount),
            price: parseFloat(v.price),
            discount: parseFloat(v.discount || 0),
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Товар успішно додано!", product },
      { status: 201 }
    );
  } catch (err) {
    console.error("Помилка при створенні товару:", err);
    return NextResponse.json({ error: "Помилка серверу" }, { status: 500 });
  }
}
