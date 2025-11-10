"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

import '../login/login.css'

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

    const regiter = async (e:any) => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

      const res = await fetch(`api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        cache: 'no-store',
      });

      if (res.status === 201){
        const result = await signIn("credentials", {
          redirect: false,   // prevents auto-redirect
          email,
          password,
        });
        window.location.href = "/";
      } else {
        setError("Some error encontered! Please try again or contact support!")
      }

  }

  return (
    <div className="container">
      <main className="page-root">
          <h1 className="title">Register</h1>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label className="label">
              Name
            <input className="input" type="text" name="name" value={name} onChange={(e:any)=> setName(e.target.value)} placeholder="Enter your name" required />
            </label>

            <label className="label">
              Email
            <input className="input" type="email" name="email" value={email} onChange={(e:any)=> setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>

            <label className="label">
              Password
              <input className="input" type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" required />
            </label>

            <label className="label">
              Confirm Password
              <input className="input" type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
            </label>

            <button className="btn" type="submit" onClick={regiter}>Sign Up</button>
            {error && <p className="err-txt">{error}</p>}

            <div className="footer">
              <label className="no-account">
                Already have an account?
              </label>
              <a className="link" href="/login">Login</a>
            </div>
          </form>
      </main>
    </div>
  )
}