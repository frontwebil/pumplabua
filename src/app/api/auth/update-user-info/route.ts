import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updateData = { ...body };
    updateData.dateBirthday = new Date(body.dateBirthday);

    const newUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...updateData,
      },
      select: {
        email: true,
      },
    });

    const html = `
    <div style="font-family: 'Inter', sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; border-radius: 16px; max-width: 500px; margin: auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #f8fafc; margin: 0; font-size: 22px;">Оновлення профілю</h1>
    <p style="color: #94a3b8; font-size: 14px;">Ваш профіль було успішно оновлено.</p>
  </div>

  <div style="background: #1e293b; padding: 24px; border-radius: 12px;">
    <p style="color: #cbd5e1; font-size: 15px; margin: 0;">
      Якщо ви не виконували цю дію — негайно змініть пароль або зверніться в підтримку.
    </p>
  </div>

  <div style="text-align: center; margin-top: 30px;">
    <p style="color: #475569; font-size: 12px;">© ${new Date().getFullYear()} pamplabua — Усі права захищені.</p>
  </div>
</div>`;

    await resend.emails.send({
      from: "PumpLabUA <notifications@pumplabua.shop>",
      subject: "Данні вашого акаунту змінено!",
      to: newUser.email,
      html: html,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
