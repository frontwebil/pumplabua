import { NextRequest, NextResponse } from "next/server";
import { createWayForPayForm } from "@/lib/wayforpay";
import { OrderPayType } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    orderProducts,
    name,
    surname,
    middleName,
    phoneNumber,
    email,
    delivery,
    villageCity,
    street,
    department,
    typeOfPay,
  } = body;

  // ✅ PREPARE ITEMS
  const items = orderProducts.map((p: any) => {
    const finalPrice = p.selectedVariant.discount
      ? Math.ceil(
          p.selectedVariant.price * (1 - p.selectedVariant.discount / 100)
        )
      : p.selectedVariant.price;

    return {
      ...p,
      quantity: p.quantityProduct, // ✅ FIX
      finalPrice,
    };
  });

  // ✅ REAL TOTAL (for prod later)
  const realTotal = items.reduce(
    (sum: number, i: any) => sum + i.finalPrice * i.quantity,
    0
  );

  const deliveryPrice = realTotal >= 3000 ? 0 : 89;
  const orderRef = `PUMPLAB-${Date.now()}`;

  const payType: OrderPayType =
    typeOfPay === "when received"
      ? OrderPayType.when_received
      : OrderPayType.online;

  const order = await prisma.order.create({
    data: {
      orderRef,
      name,
      surname,
      middleName,
      phoneNumber,
      email,
      delivery,
      villageCity,
      street,
      department,
      typeOfPay: payType,
      totalPrice: realTotal,
      deliveryPrice: deliveryPrice,
      discount: 0,
      status: typeOfPay === "online" ? "PENDING" : "NEW",
      items: {
        create: items.map((p: any) => ({
          name: p.name,
          producer: p.producer,
          category: p.category,
          slug: p.slug,
          flavor: p.selectedVariant.flavor,
          amount: p.selectedVariant.amount,
          unitType: p.selectedVariant.unitType,
          sizeAmount: p.selectedVariant.sizeAmount,
          price: p.selectedVariant.price,
          discount: p.selectedVariant.discount,
          images: p.selectedVariant.images,
          quantity: p.quantity,
          finalPrice: p.finalPrice,
        })),
      },
    },
  });

  // ✅ OFFLINE PAYMENT
  if (typeOfPay === "when received") {
    return NextResponse.json({ success: true, payment: "offline", orderRef });
  }

  // ✅ ONLINE PAYMENT
  const form = createWayForPayForm(order, items).form;

  return NextResponse.json({ success: true, payment: "online", form });
}
