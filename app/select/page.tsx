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
            <div className="stepper-2">stepper 3 Data</div>
          ) : (null)
        }
      </div>
    </div>
  );
}