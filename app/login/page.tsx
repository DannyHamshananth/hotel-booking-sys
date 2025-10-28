"use client"
import { useState } from "react";
import './login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
      console.log(email);
      console.log(password);

  }

  return (
    <div className='container'>
      <main className="page-root">
        <div className="card">
          <h1 className="title">Sign in</h1>


          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label className="label">
              Email
              <input className="input" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>


            <label className="label">
              Password
              <input className="input" type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" required />
            </label>


            <button className="btn" type="submit" onClick={login}>Log in</button>


            <div className="footer">
              <label className="checkbox">
                <input type="checkbox" /> Remember me
              </label>
              <a className="link" href="#">Forgot password?</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}