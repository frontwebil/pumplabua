import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Пароль і токен обов'язкові" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Пароль має містити хоча б 8 символів!",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return NextResponse.json({ error: token }, { status: 400 });
    }

    const isSamePasswords = await bcrypt.compare(password, user.password);

    if (isSamePasswords) {
      return NextResponse.json(
        { error: "Новий пароль не має співпадати зі старим!" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Пароль успішно змінено!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Проблема на сервері:", error);
    return NextResponse.json({ message: "Щось пішло не так" }, { status: 500 });
  }
}
