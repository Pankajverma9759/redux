import React from "react";
import "./AddToCart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function AddToCart() {
  const cardSelector = useSelector((state) => state.cart.items);
  console.log(cardSelector.length);
  return (
    <div className="cart">
    <Link to='/cart-list'>
      <img src='https://www.freeiconspng.com/uploads/cart-icon-14.png' alt='cart-icon'></img>
      <span className="cart-count">{cardSelector.length?cardSelector.length:0}</span>
    </Link>
    </div>
  );
}
