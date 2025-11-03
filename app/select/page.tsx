"use client"

import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { format, addDays } from "date-fns";

import Stepper from "@/app/components/Stepper";
import Card from "@/app/components/Card";
import './page.css'

export default function Page() {
  const searchParams = useSearchParams();
  const [day, setDay] = useState(searchParams.get('day') || Date);
  const [persons, setPersons] = useState(searchParams.get('persons') || 1);
  
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
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  );
}