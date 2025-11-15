import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { resend } from "@/lib/resend";
import { authOptions } from "../../[...nextauth]/route";

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

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          error: "Пароль має містити хоча б 8 символів",
        },
        {
          status: 400,
        }
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

    const html = `<div style="font-family: 'Inter', sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; border-radius: 16px; max-width: 500px; margin: auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #f8fafc; margin: 0; font-size: 22px;">Пароль змінено</h1>
    <p style="color: #94a3b8; font-size: 14px;">Ваш пароль було успішно оновлено.</p>
  </div>

  <div style="background: #1e293b; padding: 24px; border-radius: 12px;">
    <p style="color: #cbd5e1; font-size: 15px; margin: 0;">
      Якщо ви не змінювали пароль — терміново відновіть доступ і зверніться до підтримки.
    </p>
  </div>

  <div style="text-align: center; margin-top: 30px;">
    <p style="color: #475569; font-size: 12px;">© ${new Date().getFullYear()} Pamplabua — Усі права захищені.</p>
  </div>
</div>`;

    await resend.emails.send({
      from: "PumpLabUA <notifications@pumplabua.shop>",
      subject: "Пароль змінено!",
      to: user.email,
      html: html,
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
