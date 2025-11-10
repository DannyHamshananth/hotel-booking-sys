import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

import { getToken } from "next-auth/jwt";
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

export async function DELETE(req: NextRequest, { params }:any) {
  const { id } = await params;
  const token = await getToken({ req: req, secret });
  const user_id = token?.id ;

  try {

    const booking = await prisma.bookingDay.findUnique({
      where: { id: Number(id) }
    });;

    if (token?.id == booking?.user_id) {
      await prisma.bookingInfo.delete({ where: { booking_slot_id: Number(id) } });
      await prisma.bookingDay.delete({ where: { id: Number(id) } });
      return NextResponse.json({ message: "Room and related bookings deleted" });
    } else {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 403 }
      );
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error occoured!' }, { status: 400 })
  }
}