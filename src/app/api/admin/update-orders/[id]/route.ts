import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOrderEmailTemplate } from "@/lib/orderEmail";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendEmail";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await req.json();

  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json({ error: "Empty body" }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status }),

      ...(body.name && { name: body.name }),
      ...(body.surname && { surname: body.surname }),
      ...(body.middleName !== undefined && { middleName: body.middleName }),

      ...(body.phoneNumber && { phoneNumber: body.phoneNumber }),
      ...(body.email !== undefined && { email: body.email }),

      ...(body.delivery && { delivery: body.delivery }),
      ...(body.villageCity !== undefined && { villageCity: body.villageCity }),
      ...(body.street !== undefined && { street: body.street }),
      ...(body.department !== undefined && { department: body.department }),
    },
    include: {
      items: true, // если есть OrderItem
    },
  });

  if (body.status && updated.email) {
    await sendMail({
      to: updated.email,
      subject: `📦 Статус замовлення оновлено`,
      html: getOrderEmailTemplate({
        name: updated.name,
        orderRef: updated.orderRef!,
        status: updated.status,
        total: updated.totalPrice + updated.deliveryPrice,
      }),
    });
  }

  return NextResponse.json(updated);
}
