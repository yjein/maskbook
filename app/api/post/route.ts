import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const postList = await prisma.post.findMany({
    where: {
      // likedCount: 1,
    },
  });

  return NextResponse.json({
    ok: true,
    // text: "hello",
    postList,
  });
}
