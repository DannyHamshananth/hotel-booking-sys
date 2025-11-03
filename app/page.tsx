"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import './page.css'
export default function Home() {
  const [day, setDay] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [persons, setPersons] = useState(2);
  const router = useRouter();

  const search = () => {
    router.push(`/select?day=${day}&persons=${persons}`);
  }
  return (
    <div className='container'>
      <div className="center-box">
        Image
      </div>
      <div className='book-title'>
        Book a room
      </div>
      <div className="search-bar">
        <select value={persons} onChange={(e)=>{setPersons(parseInt(e.target.value))}}  className="dropdown">
          <option value="1">👤 1</option>
          <option value="2">👥 2</option>
          <option value="3">👥 3</option>
          <option value="4">👥 4</option>
        </select>

        <input
          type="date"
          className="date-input"
          defaultValue={day}
          onChange={(e)=>setDay(e.target.value)}
        />
      </div>
      <button onClick={search} className="search-button">SEARCH FOR ROOMS</button>
    </div>
  )
}
