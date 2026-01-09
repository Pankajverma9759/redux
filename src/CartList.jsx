import React, { useState } from "react";
import "./CartList.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearAllItem } from "./redux/slice";
import { placeOrder as placeOrderAction } from "./redux/orderSlice";

import { FaMoneyBillWave, FaCreditCard, FaGooglePay } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { Link } from "react-router-dom";

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Quantity State
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const increaseQty = (id) => {
    setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  };

  const decreaseQty = (id) => {
    if (quantities[id] > 1) {
      setQuantities({ ...quantities, [id]: quantities[id] - 1 });
    }
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * quantities[item.id],
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-wrapper">
        <h2 className="empty-cart">🛒 Cart is Empty</h2>
        <Link to="/my-order" className="go-order-link">
          Go to My Order
        </Link>
      </div>
    );
  }

  // PLACE ORDER
  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems.map((item) => ({
        ...item,
        quantity: quantities[item.id],
      })),
      total: totalPrice,
      payment: paymentMethod,
      address,
      date: new Date().toLocaleString(),
    };

    dispatch(placeOrderAction(newOrder));

    setShowPopup(true);

    setTimeout(() => {
      dispatch(clearAllItem());
      setShowPopup(false);
    }, 2500);
  };

  return (
    <div className="cart-page">
      <h2 className="cart-heading">My Cart</h2>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-left">
              <img src={item.thumbnail} alt={item.title} />
              <h4 className="brand">{item.brand}</h4>
            </div>

            <div className="cart-right">
              <h4>{item.title}</h4>
              <p className="price">₹{item.price}</p>

              <div className="quantity-box">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{quantities[item.id]}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeItem(item))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS */}
      <div className="address-section">
        <h3>Delivery Address</h3>
        <textarea
          placeholder="Enter full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* PAYMENT */}
      <div className="payment-section">
        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            name="pay"
            onChange={() => setPaymentMethod("UPI")}
          />
          <FaGooglePay /> UPI
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            onChange={() => setPaymentMethod("PhonePe")}
          />
          <SiPhonepe /> PhonePe
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            onChange={() => setPaymentMethod("Paytm")}
          />
          <SiPaytm /> Paytm
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            onChange={() => setPaymentMethod("Card")}
          />
          <FaCreditCard /> Card
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            onChange={() => setPaymentMethod("COD")}
          />
          <FaMoneyBillWave /> Cash on Delivery
        </label>
      </div>

      {/* TOTAL */}
      <div className="cart-total">
        <span>Total</span>
        <span>₹{totalPrice}</span>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>

      {showPopup && (
        <div className="order-popup">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Payment: {paymentMethod}</p>
        </div>
      )}
    </div>
  );
}
