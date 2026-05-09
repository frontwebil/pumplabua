import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOrderEmailTemplate } from "@/lib/orderEmail";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendEmail";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const STATUS_TEXT: Record<string, { title: string; message: string }> = {
  NEW: {
    title: "Замовлення прийнято ✅",
    message:
      "Дякуємо за замовлення! Ми вже отримали його та розпочали обробку.",
  },
  PENDING: {
    title: "Очікується оплата ⏳",
    message:
      "Ваше замовлення очікує оплату. Будь ласка, завершіть платіж, щоб ми могли почати обробку.",
  },
  PAID: {
    title: "Оплата успішна 💳",
    message: "Ми отримали вашу оплату та готуємо товар до відправки.",
  },
  CONFIRMED: {
    title: "Замовлення підтверджене 📦",
    message:
      "Ваше замовлення підтверджено менеджером і готується до відправки.",
  },
  SENDTORECEIVER: {
    title: "Замовлення відправлено 🚚",
    message:
      "Ваше замовлення передано службі доставки та скоро прибуде до вас.",
  },
  DELIVERED: {
    title: "Замовлення доставлено ✅",
    message: "Дякуємо за покупку! Якщо виникнуть питання — напишіть нам.",
  },
  FAILED: {
    title: "Помилка оплати ❌",
    message: "Під час оплати сталася помилка. Будь ласка, спробуйте ще раз.",
  },
  VET_SPORT: {
    title: "Очікує підтвердження ⏳",
    message:
      "Найближчим часом з вами зв’яжеться менеджер для підтвердження замовлення та надсилання посилання на оплату через програму «Ветеранський спорт».",
  },
  CANCELED: {
    title: "Замовлення скасовано ❌",
    message:
      "Ваше замовлення було скасовано. Якщо це помилка — зверніться до підтримки.",
  },
};

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
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

  const before = await prisma.order.findUnique({
    where: { id },
    select: { status: true },
  });

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

  if (before?.status !== updated.status && updated.email) {
    await sendMail({
      to: updated.email,
      subject:
        STATUS_TEXT[updated.status]?.title || "Статус замовлення оновлено",
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
