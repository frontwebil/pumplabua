import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: "Reset link has been sent if the email exists",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiryDate = new Date(Date.now() + 3600 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiryDate,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/token=${token}`;

    const html = `
    <div style="font-family: 'Inter', sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; border-radius: 16px; max-width: 500px; margin: auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #f8fafc; margin: 0; font-size: 22px;">Скидання пароля</h1>
    <p style="color: #94a3b8; font-size: 14px;">Ми отримали запит на скидання вашого пароля.</p>
  </div>

  <div style="background: #1e293b; padding: 24px; border-radius: 12px; text-align: center;">
    <p style="color: #cbd5e1; font-size: 15px; margin-bottom: 24px;">
      Натисніть кнопку нижче, щоб скинути пароль:
    </p>

    <a href="${resetLink}"
       style="display: inline-block; background: linear-gradient(90deg, #3b82f6, #8b5cf6);
              color: white; padding: 12px 24px; border-radius: 8px;
              text-decoration: none; font-weight: 600; transition: 0.3s;">
      Скинути пароль
    </a>

    <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
      Якщо ви не робили цього запиту — просто ігноруйте лист.
    </p>
  </div>

  <div style="text-align: center; margin-top: 30px;">
    <p style="color: #475569; font-size: 12px;">© ${new Date().getFullYear()} TreliX — Усі права захищені.</p>
  </div>
</div>
`;

    await resend.emails.send({
      from: "PumpLabUA <notifications@pumplabua.shop>",
      subject: "Зміна паролю!",
      to: user.email,
      html: html,
    });

    return NextResponse.json({
      message: "Reset link has been sent if the email exists",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
