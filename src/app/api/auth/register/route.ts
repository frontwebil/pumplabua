import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email ?? "").toLowerCase().trim();
    const password = body.password ?? "";
    const name = body.name ?? "";
    const surname = body.surname ?? "";

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Пошта і пароль обов'язкові!",
        },
        {
          status: 400,
        }
      );
    }

    if (!name || !surname) {
      return NextResponse.json(
        {
          error: "Ім'я і прізвище обов'язкові!",
        },
        {
          status: 400,
        }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        {
          error: "Будь ласка , введіть корректний email",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Пароль має містити хоча б 8 символів",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Така пошта вже зареєстрована!",
        },
        {
          status: 409,
        }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        surname,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
