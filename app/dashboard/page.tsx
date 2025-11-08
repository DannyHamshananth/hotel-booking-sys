"use client"
import { useState } from "react";

import BookingCard from '@/app/components/BookingCard';

export default function Dashboard() {
  const [booking, setBooking] = useState({
    id: 1,
    checkIn: "2025-11-06",
    checkOut: "2025-11-07",
    ref: "RES17",
    nights: 1,
    roomTitle: "Room 2 Title",
    guests: 2,
    roomPrice: 1280.5,
    tax: 115.25,
    total: 1395.75,
    status: "upcoming",
  });

  const handleCancel = () => setBooking({ ...booking, status: "cancelled" });

  return (
    <div className='container'>
      <h1>Booking History</h1>
      <BookingCard booking={booking} sendDataToParent={handleCancel} />
    </div>
  )
}