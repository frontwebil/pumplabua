import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json({ error: "Не зареєстровані" }, { status: 401 });
  }

  const userFavorite = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  return NextResponse.json({
    favoriteProducts: userFavorite?.favoriteProducts,
  });
}
