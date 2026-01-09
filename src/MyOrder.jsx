import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "./redux/orderSlice";
import "./Orders.css";

export default function MyOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  if (orders.length === 0) {
    return <h2 className="empty-orders">No orders placed yet</h2>;
  }

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const handleDelete = () => {
    dispatch(deleteOrder(deleteId));
    setShowPopup(false);
    setDeleteId(null);
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <div>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
            </div>

            <button
              className="delete-order-btn"
              onClick={() => confirmDelete(order.id)}
            >
              Delete
            </button>
          </div>

          <p><strong>Payment:</strong> {order.payment}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Address:</strong> {order.address}</p>

          <div className="order-items">
            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete Order?</h3>
            <p>Are you sure you want to delete this order?</p>

            <div className="popup-actions">
              <button className="btn-cancel" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
