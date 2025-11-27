import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { getOrderEmailTemplate } from "@/lib/orderEmail";
import { sendMail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log("WAYFORPAY WEBHOOK:", data);

  const { orderReference, merchantSignature, reasonCode } = data;
  const secret = process.env.WAYFORPAY_MERCHANT_SECRET!;

  const signString = [
    data.merchantAccount,
    orderReference,
    data.amount,
    data.currency,
    data.authCode,
    data.cardPan,
    data.transactionStatus,
    reasonCode,
  ].join(";");

  const localSignature = crypto
    .createHmac("md5", secret)
    .update(signString)
    .digest("hex");

  // ✅ SIGN CHECK
  if (localSignature !== merchantSignature) {
    return NextResponse.json({ error: "INVALID SIGN" }, { status: 403 });
  }

  const order = await prisma.order.findUnique({
    where: { orderRef: orderReference },
  });

  if (!order) {
    return NextResponse.json({ error: "ORDER NOT FOUND" }, { status: 404 });
  }

  // ✅ STATUS DEFINE
  const newStatus = data.transactionStatus === "Approved" ? "PAID" : "FAILED";

  // ✅ UPDATE ORDER
  const updated = await prisma.order.update({
    where: { orderRef: orderReference },
    data: { status: newStatus },
  });

  // ✅ SEND EMAIL
  if (updated.email) {
    await sendMail({
      to: updated.email,
      subject:
        newStatus === "PAID"
          ? "✅ Оплата успішна — Pamplabua"
          : "❌ Помилка оплати — Pamplabua",
      html: getOrderEmailTemplate({
        name: updated.name,
        orderRef: updated.orderRef!,
        status: newStatus,
        total: updated.totalPrice + updated.deliveryPrice,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
