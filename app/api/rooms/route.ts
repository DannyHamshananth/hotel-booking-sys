import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}