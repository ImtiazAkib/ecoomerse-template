import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../features/cart/cartSlice";
import header from "../../images/hero.jpg";
import CartItem from "../CartItem/CartItem";
import "./Shop.css";

const Shop = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  return (
    <>
      <header>
        <div className="shop-hero">
          <img src={header} alt="shop" />
        </div>
      </header>
      {isLoading ? (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.length &&
            cartItems.map((item) => <CartItem key={item.id} {...item} />)}
        </div>
      )}
    </>
  );
};

export default Shop;
