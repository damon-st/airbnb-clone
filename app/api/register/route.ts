import bycript from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  const hashedPassword = await bycript.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
