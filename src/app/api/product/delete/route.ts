import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Не вказано ID продукту" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Продукт не знайдено" },
        { status: 404 }
      );
    }

    const allImages = [...product.variants.flatMap((v) => v.images)];

    for (const img of allImages) {
      if (!img) continue;

      const publicId = img
        .split("/")
        .slice(-1)[0]
        .replace(".webp", "")
        .replace(".jpg", "")
        .replace(".png", "");

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (err) {
        console.warn("Не вдалося видалити з Cloudinary:", err);
      }
    }

    await prisma.variant.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "ok", id }, { status: 200 });
  } catch (err) {
    console.error("Помилка при видаленні товару:", err);
    return NextResponse.json({ error: "Помилка серверу" }, { status: 500 });
  }
}
