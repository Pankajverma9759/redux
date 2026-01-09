import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productSlice";
import { addItem, removeItem } from "./redux/slice";

export default function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.cart.items);

  // if (status === "loading") {
  //   return <h2>Loading products...</h2>;
  // }

  return (
    <div className="grid">
      {products.map((item) => {
        const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

        return (
          <div className="card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />

            <div className="content">
              <div className="title">{item.title}</div>
              <div className="price">Price: ₹{item.price}</div>
              <div className="rating">Rating: {item.rating}</div>

              <button
                className={`btn ${isInCart ? "remove-btn" : "add-btn"}`}
                onClick={() =>
                  isInCart
                    ? dispatch(removeItem(item))
                    : dispatch(addItem(item))
                }
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
