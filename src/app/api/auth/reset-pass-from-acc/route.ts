import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    const isValidPass = await bcrypt.compare(oldPassword, user?.password);

    if (!isValidPass) {
      return NextResponse.json(
        { error: "Старий пароль невірний" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Пароль успішно змінено" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Сталася помилка при зміні пароля" },
      { status: 500 }
    );
  }
}
