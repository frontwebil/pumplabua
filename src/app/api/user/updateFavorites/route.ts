import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Не зареєстровані" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Такого продукту не знайдено" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updatedFavorites: string[];

    // если уже есть в избранном — удаляем, иначе добавляем
    if (user.favoriteProducts.includes(productId)) {
      updatedFavorites = user.favoriteProducts.filter((id) => id !== productId);
    } else {
      updatedFavorites = [...user.favoriteProducts, productId];
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { favoriteProducts: updatedFavorites },
    });

    return NextResponse.json({
      favoriteProducts: updatedUser.favoriteProducts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
