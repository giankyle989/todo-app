import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { todo } = await req.json();
  const { id } = params;

  if (!todo || typeof todo !== "string") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const updated = await prisma.todo.update({
    where: { id },
    data: { todo },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Todo deleted" });
}
