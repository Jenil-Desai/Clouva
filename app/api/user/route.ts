import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = JSON.parse(cookieStore.get('user')!.value);

  if (!userCookie) {
    return NextResponse.json({ error: "User not found" }, {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userCookie.email,
    },

    select: {
      email: true,
      lastName: true,
      firstName: true,
      publicKey: true,
    }
  })

  return NextResponse.json(user, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
