import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { clearCartItem } from "../../features/cart/cartSlice";
const Cart = () => {
  const { amount, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  return (
    <div className="cart">
      <div className="product-cart-container">
        {amount?.map((item) => {
          return (
            <div key={item.product.id} className="product-card">
              <div className="product-card-img">
                <img src={item.product.thumbnail} alt="product" />
              </div>
              <div className="product-card-content">
                <h1 className="product-card-title">
                  Product Name: {item.product.title.slice(0, 10)}
                </h1>
                <p className="product-card-price">
                  Product Price: ${item.product.price}
                </p>
                <p className="product-card-amount">
                  Product Amount: {item.amount}
                </p>
                <Button
                  variant="primary"
                  onClick={() => dispatch(clearCartItem(item.product.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-container">
        <h1>Total Price</h1>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default Cart;
