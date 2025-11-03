import './Card.css'

export default function Card({room}:any) {
  const booking = (id:any) => {
    
  }
  return (
    <div className="card">
      <div className="card-left">
        <div className="image-placeholder">340 × 210</div>
        <div className="room-info">
          <h3>{room.room.title_1}</h3>
          <p className="subtitle">{room.room.title_2}</p>
          <p className="desc">
            {room.room.desc}
          </p>
        </div>
      </div>
      <div className="card-right">
        <p className="price">${room.room.amount.toLocaleString()}<span>/night</span></p>
        <p className="note">Subject to GST and charges</p>
        <button className="book-btn" id={room.id} onClick={(e)=> {booking(room.id)}}>BOOK ROOM</button>
      </div>
    </div>
  );
}