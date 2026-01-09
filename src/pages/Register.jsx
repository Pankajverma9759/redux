import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ id: Date.now(), ...form });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
