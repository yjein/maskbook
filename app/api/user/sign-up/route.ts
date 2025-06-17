import prisma from "@/lib/server/prisma";
import { generateSaltedHash } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, ctx: any) {
  const { email, password } = await req.json();
  // 이렇게도 쓸 수 있음
  // const info = await req.json();
  // const email = info.email;
  // const password = info.password;

  const passwordHash = generateSaltedHash(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  if (user) {
    return NextResponse.json({
      ok: true,
    });
  }

  return NextResponse.json({
    ok: false,
  });
}
