import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.email) {
      return NextResponse.json(
        { error: "Session is Required" },
        { status: 403 }
      );
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // ✅ беремо тільки з БД
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ✅ перевірка власника
    if (order.email !== session.user.email) {
      return NextResponse.json(
        { error: "Not allowed to delete this order" },
        { status: 403 }
      );
    }

    // ✅ НЕ видаляємо оплачене (необовʼязково, але корисно)
    if (order.status !== "NEW") {
      return NextResponse.json(
        { error: "Only NEW orders can be deleted" },
        { status: 400 }
      );
    }

    // ✅ ВИДАЛЕННЯ
    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete order error:", error);
    return NextResponse.json(
      { error: "Server error while deleting order" },
      { status: 500 }
    );
  }
}
