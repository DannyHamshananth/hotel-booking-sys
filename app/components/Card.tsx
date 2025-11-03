import './Card.css'

export default function Card() {
  return (
    <div className="card">
      <div className="card-left">
        <div className="image-placeholder">340 × 210</div>
        <div className="room-info">
          <h3>ROOM 1 TITLE</h3>
          <p className="subtitle">LOREM IPSUM DOLOR SIT AMET</p>
          <p className="desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ex a risus dapibus
            pharetra facilisis ac felis.
          </p>
        </div>
      </div>
      <div className="card-right">
        <p className="price">S$1,080<span>/night</span></p>
        <p className="note">Subject to GST and charges</p>
        <button className="book-btn">BOOK ROOM</button>
      </div>
    </div>
  );
}