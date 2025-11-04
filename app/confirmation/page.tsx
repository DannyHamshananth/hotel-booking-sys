import './confirmation.css'

export default function BookingConfirmation() {
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">YOUR BOOKING HAS BEEN CONFIRMED</h2>
      <p className="confirmation-subtitle">
        We have sent your booking confirmation to the email address that you have provided.
      </p>

      <div className="booking-info">
        <p>
          <strong>Check-in/Check-out:</strong> JUN 17, 2025 – JUN 18, 2025
        </p>
        <p>
          <strong>Booking Confirmation Number:</strong> RES123456789
        </p>
        <p>
          <strong>Total Price for 1 Night:</strong> S$1,177.20
        </p>
      </div>

      <div className="details-card">
        <div className='left-card'>
        <div className="room-section">
          <div className="room-image"></div>
          <div>
            <h4>ROOM: ROOM 1 TITLE</h4>
            <p>1 Guest</p>
          </div>
        </div>
          <div className="price-list">
            <p>Room <span>S$1,080.00</span></p>
            <p>Tax & Service Charges (9%) <span>S$97.20</span></p>
            <p className="total">Total Price <span>S$1,177.20</span></p>
          </div>
        </div>

        <div className="guest-section">
          <h5>GUEST DETAILS</h5>
          <p>Name: Mr. Keegan Middleton</p>
          <p>Email Address: bazytguetgle@g.eu</p>
        </div>
      </div>
    </div>
  );
}