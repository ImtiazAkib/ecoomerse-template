import { faCartShopping, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { totalAmount } = useSelector((store) => store.cart);
  return (
    <>
      <header className="nav-main">
        <nav className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Link to="/home">
                <span>
                  <FontAwesomeIcon icon={faShop} />
                </span>
                eSHOP
              </Link>
            </div>
            <div className="search-field">
              <input type="text" />
              <Button variant="primary">Search</Button>
            </div>
          </div>
          <div className="nav-right">
            <ul>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/shop">Your Shop</Link>
              </li>
              <li id="cart">
                <Link to="/cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
                <span id="cart-amount">{totalAmount}</span>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
