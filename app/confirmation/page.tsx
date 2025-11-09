"use client";

import { use } from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { useSession } from "next-auth/react";
import './confirmation.css'

export default function BookingConfirmation({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const params = use(searchParams)
  const [booking, setBooking] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const ref = params.ref;
    if (!ref) {
      router.replace("/"); // 🚫 prevent direct access
      return;
    }

    if (status === "unauthenticated") {
      router.replace("/login"); // redirect if not logged in
    }

    // Optional: fetch booking details securely by ref
    (async () => {
      try {
        const res = await fetch(`/api/booking/${ref}`);
        console.log(res);
        if (res.status === 403) {
          setError("Restricted");
          return;
        }
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError("Something went wrong");
      }
    })();
  }, []);

  if (error) return <p>Not Allowed!</p>;

  if (!booking) return <p>Loading...</p>;

  return (
      <div className="confirmation-container">
        <h2 className="confirmation-title">YOUR BOOKING HAS BEEN CONFIRMED</h2>
        <p className="confirmation-subtitle">
          We have sent your booking confirmation to the email address that you have provided.
        </p>

        <div className="booking-info">
          <p>
            <strong>Check-in/Check-out:</strong> {booking?.day ? format(booking.day, "MMM dd, yyyy") : ""} – {booking?.day ? format(addDays(booking.day, 1), "MMM dd, yyyy") : ""}
          </p>
          <p>
            <strong>Booking Confirmation Number:</strong> RES{booking.id}
          </p>
          <p>
            <strong>Total Price for 1 Night:</strong> {booking?.bookingInfo?.room_charge ? (Number(booking.bookingInfo.room_charge) + Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }) : ""}
          </p>
        </div>

        <div className="details-card">
          <div className='left-card'>
            <div className="room-section">
              <div className="room-image"></div>
              <div>
                <h4>ROOM: {booking?.room?.title_1 ? booking.room.title_1 : ""}</h4>
                <p>{booking.guests} {booking.guests == 1 ? 'Guest' : 'Guests'}</p>
              </div>
            </div>
            <div className="price-list">
              <p>Room <span>{booking?.bookingInfo?.room_charge ? (Number(booking.bookingInfo.room_charge)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }) : ""}</span></p>
              <p>Tax & Service Charges (9%) <span>{booking?.bookingInfo?.extra_charges ? (Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }) : ""}</span></p>
              <p className="total">Total Price <span>{booking?.bookingInfo?.room_charge && booking?.bookingInfo?.extra_charges ? (Number(booking.bookingInfo.room_charge) + Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }) : ""}</span></p>
            </div>
          </div>

          <div className="guest-section">
            <h5>GUEST DETAILS</h5>
            <p>Name: {booking?.bookingInfo?.title || ""} {booking?.bookingInfo?.name}</p>
            <p>Email Address: {booking?.bookingInfo?.email || ""}</p>
          </div>
        </div>
      </div>
  );
}