import { useState } from "react";
import "./BookingCard.css";

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
          <strong>Check-in/Check-out:</strong>{" "}
          {new Date(booking.checkIn).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          –{" "}
          {new Date(booking.checkOut).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p>
          <strong>Booking Confirmation Number:</strong> {booking.ref}
        </p>
        <p>
          <strong>Total Price for {booking.nights} Night{booking.nights > 1 ? "s" : ""}:</strong>{" "}
          {booking.total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>

      <div className="booking-summary-body">
        <div className="room-section">
          <div className="room-image"></div>
          <div className="room-info">
            <h3>
              ROOM: <span>{booking.roomTitle}</span>
            </h3>
            <p>{booking.guests} Guests</p>
            <table>
              <tbody>
                <tr>
                  <td>Room</td>
                  <td className="price">
                    {booking.roomPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Tax & Service Charges (9%)</td>
                  <td className="price">
                    {booking.tax.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
                <tr className="total-row">
                  <td><strong>Total Price</strong></td>
                  <td className="price total">
                    <strong>
                      {booking.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
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