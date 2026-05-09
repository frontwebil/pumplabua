import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RefreshCartItem = {
  variantId?: string;
  quantityProduct: number;
  productId?: string;
  flavor?: string | null;
  amount?: number | null;
  unitType?: string | null;
  sizeAmount?: string | null;
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

  const variants = variantIds.length
    ? await prisma.variant.findMany({
        where: { id: { in: variantIds } },
        include: { product: true },
      })
    : [];

  const byId = new Map(variants.map((v) => [v.id, v]));

  const removedVariantIds: string[] = [];
  const orderProducts: unknown[] = [];

  for (const i of items) {
    const qty = Number(i?.quantityProduct) || 0;
    if (qty < 1) {
      if (i?.variantId) removedVariantIds.push(i.variantId);
      continue;
    }

    let v =
      i?.variantId && typeof i.variantId === "string"
        ? byId.get(i.variantId)
        : undefined;

    if (!v) {
      // Fallback: if admin recreated variants (new id), try match by product + signature
      if (
        typeof i?.productId === "string" &&
        i.productId.length > 0 &&
        typeof i?.unitType === "string" &&
        i.unitType.length > 0
      ) {
        v = await prisma.variant.findFirst({
          where: {
            productId: i.productId,
            unitType: i.unitType,
            // match optional fields as exact if provided
            flavor: i.flavor ?? undefined,
            amount: i.amount ?? undefined,
            sizeAmount: i.sizeAmount ?? undefined,
          },
          include: { product: true },
        });
      }
    }

    if (!v) {
      if (i?.variantId) removedVariantIds.push(i.variantId);
      continue;
    }

    // якщо не в наявності або товар неактивний — прибираємо з корзини
    if (!v.inStock || !v.product.isActive) {
      if (i?.variantId) removedVariantIds.push(i.variantId);
      continue;
    }

    orderProducts.push({
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
    });
  }

  return NextResponse.json({ orderProducts, removedVariantIds });
}

