import { faCartShopping, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import app from "../Firebase/firebase.init";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { removeUser } from "../../features/cart/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { totalAmount, user } = useSelector((store) => store.cart);
  const auth = getAuth(app);
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error, "An error happened");
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(removeUser(""));
      }
    });
  }, [user.email]);
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
                {user.email ? (
                  <Button variant="primary" onClick={() => logOut()}>
                    Log Out
                  </Button>
                ) : (
                  <Link to="/login">Sign In</Link>
                )}
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
