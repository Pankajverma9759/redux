import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddToCart from "./AddToCart";

//import "./App.css";
import './index.css';
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">MyShop</div>

      {/* Hamburger (ONLY for mobile) */}
      <div
        className="hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </div>

      {/* Nav: Desktop always open | Mobile toggle */}
      <nav className={`nav ${mobileMenuOpen ? "open" : ""}`}>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/" className="link">Home</NavLink>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/contact-form" className="link">Contact</NavLink>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/my-order" className="link">My Order</NavLink>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/register" className="link">Register</NavLink>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/login" className="link">Login</NavLink>
        <NavLink onClick={() => setMobileMenuOpen(false)} to="/profile" className="link">Profile</NavLink>
      </nav>

      <div className="cart-wrapper">
        <AddToCart />
      </div>
    </header>
  );
}
