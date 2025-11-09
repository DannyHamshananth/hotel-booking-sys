"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";

import Stepper from "@/app/components/Stepper";
import Card from "@/app/components/Card";
import './page.css'

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stepperPosition, setStepperPosition] = useState(2);
  const [day, setDay] = useState<any>();
  const [persons, setPersons] = useState<any>();
  const [rooms, setRooms] = useState([]);

  const [title, setTitle] = useState("Mr.");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [slot, setSlot] = useState<any>();

  const handleDataFromChild = (id: number) => {
    setStepperPosition(prev => prev + 1);
    setSlot(rooms.find((room:any) => room.id === id));
  };

  const booking = async () => {

    const res = await fetch(`/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:slot.id, day, guests:Number(persons), room_id: slot.room.id, room_charge:slot.room.amount, title, name, email}),
      cache: 'no-store',
    });

    if (res.status === 201) {
      const booking = await res.json();
      router.push(`/confirmation?ref=${booking.id}`);
    }
  }

  useEffect(() => {
    setDay(searchParams.get('day') || new Date().toISOString());
    setPersons(searchParams.get('persons') || 1);

    const dayParam = searchParams.get('day');
    const dayDate = dayParam ? new Date(dayParam) : new Date(); // fallback today
    const formated_date = format(dayDate, "yyyy-MM-dd'T'00:00:00.000'Z'");

    setName(session?.user?.name || "");
    setEmail(session?.user?.email || "");
    (async () => {
      const params = {
        day: formated_date,
        persons: searchParams.get('persons') as string
      };
      const queryString = new URLSearchParams(params).toString();
      const baseUrl = 'http://localhost:3000/api/rooms';
      const url = `${baseUrl}?${queryString}`;
      console.log(url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result)
        setRooms(result);
      } catch (error) {
        console.log("Fetch failed:", error);
      }
    })();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="stepper-inner">
        <Stepper currentStep={stepperPosition} />
        {stepperPosition == 2 ?
          (<div className="stepper-1">
            <div className="filters">
              <div className="date-range">
                {day ? format(day, "MMM dd, yyyy") : ""} &rarr; {day ? format(addDays(day, 1), "MMM dd, yyyy") : ""}
              </div>
              <div className="capacity">
                {persons} {persons == 1 ? 'Guest' : 'Guests'} | 1 Night
              </div>
            </div>
            <div className="room-list">
              {rooms.length > 0 ?
                rooms.map((room: any) =>
                  <Card key={room.id} room={room} sendDataToParent={handleDataFromChild} />
                ) :
                (<div className="no-message">Sorry! No rooms available on this day for {persons} {persons == 1 ? 'Guest' : 'Guests'}.</div>)
              }
            </div>
          </div>) : stepperPosition == 3 ? (
            <div className="stepper-2">
              <div className="data-section">
              <div className="contact-section">
                <h3>CONTACT INFORMATION</h3>

                <div className="form-group">
                  <label>Title</label>
                  <select value={title} onChange={(e)=>setTitle(e.target.value)}>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                </div>
                <div className="button-section">
                  <button className="proceed-btn" onClick={booking}>PROCEED</button>
                </div>
              </div>

              <div className="summary-section">
                <p className="date">{format(day, "MMM dd, yyyy")} ➜ {format(addDays(day, 1), "MMM dd, yyyy")}</p>
                <p>1 NIGHT</p>
                <h4>ROOM: {persons} {persons == 1 ? 'Guest' : 'Guests'}</h4>

                <div className="room-image">340 × 210</div>

                <div className="price-details">
                  <p>{slot.room.title_1}</p>
                  <div className="price-line">
                    <span>Room</span>
                    <span>{Number(slot.room.amount).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span>
                  </div>
                  <div className="price-line">
                    <span>Tax & Service Charges (9%)</span>
                    <span>{Number(slot.room.amount*0.09).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span>
                  </div>
                  <div className="total-line">
                    <span>Total</span>
                    <span><strong>{(Number(slot.room.amount)+Number(slot.room.amount*0.09)).toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ) : (null)
        }
      </div>
    </div>
  );
}