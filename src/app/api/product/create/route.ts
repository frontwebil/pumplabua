import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });
    }
    const { variants, ...rest } = await req.json();

    const slug = slugify(rest.name.replace(/:/g, "-"), {
      lower: true,
      locale: "uk",
    });

    const product = await prisma.product.create({
      data: {
        ...rest,
        slug,
        variants: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: variants.map((v: any) => ({
            flavor: v.flavor || null,

            amount: v.unitType === "size" ? null : parseFloat(v.amount),
            sizeAmount: v.unitType === "size" ? v.amount : null,

            unitType: v.unitType,
            price: parseFloat(v.price),
            inStock: v.inStock,
            discount: v.discount ? parseFloat(v.discount) : 0,
            isMain: v.isMain || false,
            images: v.images || [],
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
