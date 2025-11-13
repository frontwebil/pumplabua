import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.id || typeof session.user.id !== "string") {
      return NextResponse.json(
        { error: "Invalid session data" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        middleName: true,
        dateBirthday: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Error in /api/user GET:", error);

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
