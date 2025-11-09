import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const day = searchParams.get('day')|| undefined;
  const persons = Number(searchParams.get('persons'));

  const rooms = await prisma.bookingDay.findMany({
    where: {
      day: day,
      user_id: {equals:null},
      room: {persons: {gte:persons}},
    },
    include: { 
      room:true
    },
  });
  return NextResponse.json(rooms);
}