import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import './css/Login.css';
export default function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );

    if (!user) return alert("Invalid credentials");

    dispatch(loginSuccess(user));
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
