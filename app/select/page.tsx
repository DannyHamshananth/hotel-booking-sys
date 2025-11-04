"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { format, addDays, parseISO } from "date-fns";

import Stepper from "@/app/components/Stepper";
import Card from "@/app/components/Card";
import './page.css'

export default function Page() {
  const searchParams = useSearchParams();
  const [stepperPosition, setStepperPosition] = useState(2);
  const [day, setDay] = useState(searchParams.get('day') || Date);
  const [persons, setPersons] = useState(searchParams.get('persons') || 1);
  const [rooms, setRooms] = useState([]);

  const formated_date = format(day, "yyyy-MM-dd'T'00:00:00.000'Z'");

  const handleDataFromChild = (id: number) => {
    setStepperPosition(prev => prev + 1)
  };

  useEffect(() => {
    (async () => {
      const params = {
        day: formated_date,
        persons: persons.toString()
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
        console.error("Fetch failed:", error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="stepper-inner">
        <Stepper currentStep={stepperPosition} />
        {stepperPosition == 2 ?
          (<div className="stepper-1">
            <div className="filters">
              <div className="date-range">
                {format(day, "MMM dd, yyyy")} &rarr; {format(addDays(day, 1), "MMM dd, yyyy")}
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
                  <select className="gender-select">
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value="Adam" readOnly />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value="bazytepu@teleg.eu" readOnly />
                </div>
                </div>
                <div className="button-section">
                  <button className="proceed-btn">PROCEED</button>
                </div>
              </div>

              <div className="summary-section">
                <p className="date">JUN 17, 2025 ➜ JUN 18, 2025</p>
                <p>1 NIGHT</p>
                <h4>ROOM: 1 GUEST</h4>

                <div className="room-image">340 × 210</div>

                <div className="price-details">
                  <p><strong>ROOM 1 TITLE</strong></p>
                  <div className="price-line">
                    <span>Room</span>
                    <span>S$1,080.00</span>
                  </div>
                  <div className="price-line">
                    <span>Tax & Service Charges (9%)</span>
                    <span>S$97.20</span>
                  </div>
                  <div className="total-line">
                    <span>Total</span>
                    <span><strong>S$1,177.20</strong></span>
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