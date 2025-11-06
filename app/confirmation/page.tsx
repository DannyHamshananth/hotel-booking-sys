"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import './confirmation.css'

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("ref");
  const [booking, setBooking] = useState<any>();

  useEffect(() => {
    if (!ref) {
      router.replace("/"); // 🚫 prevent direct access
      return;
    }

    // Optional: fetch booking details securely by ref
    fetch(`/api/booking/${ref}`)
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [ref]);

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">YOUR BOOKING HAS BEEN CONFIRMED</h2>
      <p className="confirmation-subtitle">
        We have sent your booking confirmation to the email address that you have provided.
      </p>

      <div className="booking-info">
        <p>
          <strong>Check-in/Check-out:</strong> {format(booking.day, "MMM dd, yyyy")} – {format(addDays(booking.day, 1), "MMM dd, yyyy")}
        </p>
        <p>
          <strong>Booking Confirmation Number:</strong> RES{booking.id}
        </p>
        <p>
          <strong>Total Price for 1 Night:</strong> {(Number(booking.bookingInfo.room_charge)+Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}
        </p>
      </div>

      <div className="details-card">
        <div className='left-card'>
        <div className="room-section">
          <div className="room-image"></div>
          <div>
            <h4>ROOM: {booking.room.title_1}</h4>
            <p>{booking.guests} {booking.guests == 1 ? 'Guest' : 'Guests'}</p>
          </div>
        </div>
          <div className="price-list">
            <p>Room <span>{(Number(booking.bookingInfo.room_charge)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span></p>
            <p>Tax & Service Charges (9%) <span>{(Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span></p>
            <p className="total">Total Price <span>{(Number(booking.bookingInfo.room_charge)+Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span></p>
          </div>
        </div>

        <div className="guest-section">
          <h5>GUEST DETAILS</h5>
          <p>Name: {booking.bookingInfo.title} {booking.bookingInfo.name}</p>
          <p>Email Address: {booking.bookingInfo.email}</p>
        </div>
      </div>
    </div>
  );
}