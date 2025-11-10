"use client"
import { useState, useEffect } from "react";
import { isBefore, isAfter, isEqual } from "date-fns";

import "./dashboard.css";

import BookingCard from '@/app/components/BookingCard';

export default function Dashboard() {
  const today = new Date();

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/booking');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
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

  const handleCancel = async (id: any) => {
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) alert("Failed cancellation. Please try again or contact support.")

      if (res.status === 200) {
        setBookings(prev =>
          prev.map(b =>
            b.id === id ? { ...b, status: 'cancelled' } : b
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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