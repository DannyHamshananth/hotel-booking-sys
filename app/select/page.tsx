"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { format, addDays, parseISO } from "date-fns";

import Stepper from "@/app/components/Stepper";
import Card from "@/app/components/Card";
import './page.css'

export default function Page() {
  const searchParams = useSearchParams();
  const [day, setDay] = useState(searchParams.get('day') || Date);
  const [persons, setPersons] = useState(searchParams.get('persons') || 1);
  const [rooms, setRooms] = useState([]);

  const formated_date = format(day, "yyyy-MM-dd'T'00:00:00.000'Z'");

  const handleDataFromChild = (id: number) => {
    console.log(id);
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
        <Stepper currentStep={2} />
        <div className="filters">
          <div className="date-range">
            {format(day, "MMM dd, yyyy")} &rarr; {format(addDays(day, 1), "MMM dd, yyyy")}
          </div>
          <div className="capacity">
            {persons} {persons==1?'Guest':'Guests'} | 1 Night
          </div>
        </div>
        <div className="room-list">
          {rooms.map((room:any)=> 
            <Card key={room.id} room={room} sendDataToParent={handleDataFromChild}/>
          )}
        </div>
      </div>
    </div>
  );
}