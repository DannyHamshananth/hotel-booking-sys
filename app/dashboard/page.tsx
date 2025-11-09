"use client"
import { useState, useEffect } from "react";
import { isBefore, isAfter, isEqual } from "date-fns";

import "./dashboard.css";

import BookingCard from '@/app/components/BookingCard';

export default function Dashboard() {
  const today = new Date();

  // const [booking, setBooking] = useState({
  //   id: 1,
  //   checkIn: "2025-11-06",
  //   checkOut: "2025-11-07",
  //   ref: "RES17",
  //   nights: 1,
  //   roomTitle: "Room 2 Title",
  //   guests: 2,
  //   roomPrice: 1280.5,
  //   tax: 115.25,
  //   total: 1395.75,
  //   status: "upcoming",
  // });

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/booking');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
        // setBookings(result);
        const resultsWithStatus = results.map((result:any, index:any) => ({
          ...result,
          status: (()=> (isBefore(today, result.day) ? 'active': 'past'))()
        }));
        console.log(resultsWithStatus);
        setBookings(resultsWithStatus);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    })();
  },[]);

  // const handleCancel = () => setBooking({ ...booking, status: "cancelled" });
  const handleCancel = () => console.log('test');

  return (
    <div className='container'>
      <h1>Booking History</h1>
      <div className="history">
        {bookings.map((b: any, index) => (
          <BookingCard key={index} booking={b} sendDataToParent={handleCancel} />
        ))}
      </div>
    </div>
  );
}