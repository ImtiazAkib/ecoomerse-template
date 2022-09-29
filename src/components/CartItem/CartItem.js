import React from "react";
import { Link } from "react-router-dom";
import "./CartItem.css";
import {
  cartAmount,
  addToCart,
  calculateTotal,
} from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, title, description, price, thumbnail }) => {
  const dispatch = useDispatch();
  return (
    <div className="single-card">
      <div className="card-img">
        <img src={thumbnail} alt="product" />
      </div>
      <div className="card-content">
        <h1 className="card-title">{title.slice(0, 26)}</h1>
        <p className="card-info">{description.slice(0, 50)}</p>
        <p className="card-price">${price}</p>
        <Link
          to="/cart"
          onClick={() => {
            dispatch(cartAmount());
            dispatch(addToCart({ id }));
            dispatch(calculateTotal());
          }}
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default CartItem;
