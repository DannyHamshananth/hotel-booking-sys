import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)

  try {
    const booking = await prisma.bookingDay.findUnique({
      where: { id },
      include:{
        room: true,
        bookingInfo: true
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 400 })
  }
}