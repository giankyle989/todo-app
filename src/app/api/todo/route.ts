import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { todo } = await req.json();
  if (!todo || typeof todo !== "string") {
    return NextResponse.json({ error: "Invalid todo" }, { status: 400 });
  }

  const newTodo = await prisma.todo.create({ data: { todo } });
  return NextResponse.json(newTodo, { status: 201 });
}
