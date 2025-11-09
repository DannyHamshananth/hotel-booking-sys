import { useState } from "react";
import "./BookingCard.css";
import { format, addDays } from "date-fns";

type BookingCard = {
  booking: any; // you can replace `any` with your specific type
  sendDataToParent: (data: any) => void;
};

export default function BookingSummaryCard({ booking, sendDataToParent }: BookingCard) {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Cancel this booking?")) return;
    setCancelling(true);
    try {
      // simulate cancel request — replace with your API call
      await new Promise((r) => setTimeout(r, 600));
      sendDataToParent?.(booking.id);
    } catch (err) {
      alert("Failed to cancel booking");
      console.error(err);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="booking-summary-card">
      <div className="booking-summary-header">
        <p>
          <strong>Check-in/Check-out:</strong> {booking?.day ?format(booking.day, "MMM dd, yyyy"):""} – {booking?.day ?format(addDays(booking.day, 1), "MMM dd, yyyy"):""}
        </p>
        <p>
          <strong>Booking Confirmation Number:</strong> RES{booking.id}
        </p>
        <p>
          <strong>Total Price for {booking.guests} Night{booking.nights > 1 ? "s" : ""}:</strong>{" "}
          {booking?.bookingInfo?.room_charge ?(Number(booking.bookingInfo.room_charge)+Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }): ""}
        </p>
      </div>

      <div className="booking-summary-body">
        <div className="room-section">
          <div className="room-image"></div>
          <div className="room-info">
            <h3>
              ROOM: <span>{booking?.room?.title_1 ? booking.room.title_1: ""}</span>
            </h3>
            <p>{booking.guests} {booking.guests == 1 ? 'Guest' : 'Guests'}</p>
            <table>
              <tbody>
                <tr>
                  <td>Room</td>
                  <td className="price">
                    {booking?.bookingInfo?.room_charge ? (Number(booking.bookingInfo.room_charge)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }): ""}
                  </td>
                </tr>
                <tr>
                  <td>Tax & Service Charges (9%)</td>
                  <td className="price">
                    {booking?.bookingInfo?.extra_charges ? (Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }): ""}
                  </td>
                </tr>
                <tr className="total-row">
                  <td><strong>Total Price</strong></td>
                  <td className="price total">
                    <strong>
                      {booking?.bookingInfo?.room_charge && booking?.bookingInfo?.extra_charges ? (Number(booking.bookingInfo.room_charge)+Number(booking.bookingInfo.extra_charges)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }): ""}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="action-section">
          {booking.status === "cancelled" ? (
            <span className="cancelled-label">Cancelled</span>
          ) : (
            <button
              className="cancel-btn"
              onClick={handleCancel}
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}