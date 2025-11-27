import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });
  }

  // ✅ РОЗПАКОВКА promise
  const { id } = await ctx.params;

  console.log("Requested order ID:", id);

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: "Замовлення не знайдено" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}
