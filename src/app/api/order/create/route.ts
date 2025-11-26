import { NextRequest, NextResponse } from "next/server";
import { createWayForPayForm } from "@/lib/wayforpay";
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

  const items = orderProducts.map((p: any) => {
    const finalPrice = p.selectedVariant.discount
      ? Math.ceil(
          p.selectedVariant.price * (1 - p.selectedVariant.discount / 100)
        )
      : p.selectedVariant.price;

    return { ...p, finalPrice };
  });

  const totalPrice = items.reduce(
    (sum: number, i: any) => sum + i.finalPrice * i.quantityProduct,
    0
  );
  const deliveryPrice = totalPrice >= 3000 ? 0 : 89;
  const orderRef = `TEST-${Date.now()}`;

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
      typeOfPay,
      totalPrice: 2,
      deliveryPrice: 0,
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
          quantity: p.quantityProduct,
          finalPrice: p.finalPrice,
        })),
      },
    },
  });

  // OFFLINE
  if (typeOfPay === "when received") {
    return NextResponse.json({ success: true, payment: "offline", orderRef });
  }

  // ONLINE
  const form = createWayForPayForm(order, items).form;
  return NextResponse.json({ success: true, payment: "online", form });
}
