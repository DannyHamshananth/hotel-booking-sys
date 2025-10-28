"use client";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from './components/Navbar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </>
  );
}