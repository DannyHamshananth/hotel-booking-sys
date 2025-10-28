"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import "./Navbar.css";

export default function Navbar() {
  const { data: session } = useSession();
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
        {session &&
          <li>
            <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
          </li>
        }
        {!session &&
          <li>
            <Link href="/login" className={pathname.startsWith("/login") ? "active" : ""}>Login/Register</Link>
          </li>
        }
        {session &&
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // prevent normal navigation
                signOut({ callbackUrl: "/" });
              }}
            >
              Logout
            </a>
          </li>
        }
      </ul>
    </nav>
  );
}
