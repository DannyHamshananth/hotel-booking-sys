import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req: req, secret });
  const body = await req.json();
  const { id, guests, room_charge, title, name, email } = body;
  const user_id:any = token?.id;

  console.log(user_id);
  console.log(body);

  try {
    const booking = await prisma.bookingDay.update({
      where: { id: id},
      data: {
        user_id,
        guests,
        bookingInfo: {
          create: {
            room_charge,
            extra_charges: Number(room_charge*0.09),
            title,
            name,
            email,
          }
        },
      },
      include: {
        bookingInfo: true,
        room: true
      }
    });

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }

}

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req, secret });
  const user_id:any = token?.id;

  try {
    const bookings = await prisma.bookingDay.findMany({
      where: { user_id: user_id},
      include: {
        bookingInfo: true,
        room: true
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch booking data' }, { status: 500 })
  }

}

