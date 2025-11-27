import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

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

  if (localSignature !== merchantSignature) {
    return NextResponse.json({ error: "INVALID SIGN" }, { status: 403 });
  }

  const order = await prisma.order.findUnique({
    where: { orderRef: orderReference },
  });

  if (!order) {
    return NextResponse.json({ error: "ORDER NOT FOUND" }, { status: 404 });
  }

  // ✅ TEST MODE SUCCESS
  if (Number(reasonCode) === 1100) {
    await prisma.order.update({
      where: { orderRef: orderReference },
      data: { status: "PAID" },
    });
  } else {
    await prisma.order.update({
      where: { orderRef: orderReference },
      data: { status: "FAILED" },
    });

    console.warn("❌ PAYMENT FAILED:", reasonCode);
  }

  return NextResponse.json({ ok: true });
}
