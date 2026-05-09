import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RefreshCartItem = {
  variantId: string;
  quantityProduct: number;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { items?: RefreshCartItem[] };
  const items = body?.items;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ orderProducts: [], removedVariantIds: [] });
  }

  const variantIds = items
    .map((i) => i?.variantId)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  if (variantIds.length !== items.length) {
    return NextResponse.json(
      { error: "Invalid items" },
      { status: 400 }
    );
  }

  const variants = await prisma.variant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true },
  });

  const byId = new Map(variants.map((v) => [v.id, v]));

  const removedVariantIds: string[] = [];
  const orderProducts = items.flatMap((i) => {
    const v = byId.get(i.variantId);
    if (!v) {
      removedVariantIds.push(i.variantId);
      return [];
    }

    // якщо не в наявності або товар неактивний — прибираємо з корзини
    if (!v.inStock || !v.product.isActive) {
      removedVariantIds.push(i.variantId);
      return [];
    }

    const qty = Number(i.quantityProduct) || 0;
    if (qty < 1) {
      removedVariantIds.push(i.variantId);
      return [];
    }

    return [
      {
        ...v.product,
        createdAt: v.product.createdAt.toISOString(),
        updatedAt: v.product.updatedAt.toISOString(),
        selectedVariant: {
          id: v.id,
          flavor: v.flavor,
          amount: v.amount,
          unitType: v.unitType,
          sizeAmount: v.sizeAmount,
          price: v.price,
          inStock: v.inStock,
          discount: v.discount,
          isMain: v.isMain,
          images: v.images,
          productId: v.productId,
        },
        quantityProduct: qty,
      },
    ];
  });

  return NextResponse.json({ orderProducts, removedVariantIds });
}

