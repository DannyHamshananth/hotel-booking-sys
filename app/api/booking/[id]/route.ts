import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

import { getToken } from "next-auth/jwt";
import { equal } from "assert";
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, { params }:any) {
  const { id } = await params;
  const token = await getToken({ req: req, secret });

  try {
    const booking = await prisma.bookingDay.findUnique({
      where: { id: Number(id) },
      include:{
        room: true,
        bookingInfo: true
      }
    });

    if (token?.id !== booking?.user_id) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 403 }
      );
    }

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 400 })
  }
}