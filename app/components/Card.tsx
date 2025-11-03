"use client"

type CardProps = {
  room: any; // you can replace `any` with your specific type
  sendDataToParent: (data: any) => void;
};

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import './Card.css'

export default function Card({ room, sendDataToParent }: CardProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const booking = (id: any) => {
    if (!session) {
      // not logged in → redirect to login page
      router.push("/login");
    } else {
      // logged in → do your action here
      console.log("User is logged in!");
      sendDataToParent(id);
    }
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
        <button className="book-btn" id={room.id} onClick={(e) => { booking(room.id) }}>BOOK ROOM</button>
      </div>
    </div>
  );
}