import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ isValidToken: false });
  }

  const user = await prisma.user.findFirst({ where: { resetToken: token } });

  if (!user) {
    return NextResponse.json({ isValidToken: false });
  }

  if (user.resetTokenExpiry && Date.now() > user.resetTokenExpiry.getTime()) {
    return NextResponse.json({ isValidToken: false });
  }

  return NextResponse.json({ isValidToken: true });
}
