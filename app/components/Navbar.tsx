"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">ABC Hotels</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>Rooms</Link>
        </li>
        <li>
          <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link href="/login" className={pathname.startsWith("/login") ? "active" : ""}>Login/Register</Link>
        </li>
        <li>
          <Link href="/logout" className={pathname === "/logout" ? "active" : ""}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
