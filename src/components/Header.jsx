import { useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Header = () => {
  const [authState, setAuthState] = useState("Login");
  return (
    <div className="flex justify-between items-center  shadow-lg mb-2">
      <div className="logo-container">
        <img className="w-15 h-32" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul className="flex space-x-10">
          <li>Online Status: {useOnlineStatus() ? "O" : "N"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                if (authState === "Login") {
                  setAuthState("Logout");
                } else setAuthState("Login");
              }}
            >
              {authState}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
