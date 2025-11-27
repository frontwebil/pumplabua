import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { makeSignature } from "@/lib/wayforpay";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("WAYFORPAY_SECRET =", process.env.WAYFORPAY_MERCHANT_SECRET);
  const secret = process.env.WAYFORPAY_WEBHOOK_SECRET!;

  // Перевірка підпису (опційно, але рекомендовано)
  const keys = [
    "merchantAccount",
    "orderReference",
    "amount",
    "currency",
    "authCode",
    "cardPan",
    "transactionStatus",
    "reasonCode",
  ];
  const signString = keys.map((k) => data[k]).join(";");
  const localSign = makeSignature(signString, secret);

  if (localSign !== data.merchantSignature) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const orderRef = data.orderReference;
  console.log("ORDER REF:", data.orderReference);

  await prisma.order.update({
    where: { orderRef },
    data: {
      status: data.transactionStatus === "Approved" ? "PAID" : "FAILED",
    },
  });

  console.log("UPDATED ORDER:");

  return NextResponse.json({ ok: true });
}
