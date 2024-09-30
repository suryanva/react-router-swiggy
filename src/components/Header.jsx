import { useContext, useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [authState, setAuthState] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  //Selector
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-between items-center  shadow-lg mb-2">
      <div className="logo-container">
        <img className="w-15 h-32" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul className="flex space-x-10 justify-center items-center">
          <li>Online Status: {useOnlineStatus() ? "✅" : "❌"}</li>
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
          <li className="px-4 fojt-bold text-xl">
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li>
          <li>
            <button
              className={`py-2 px-4 rounded-lg font-semibold text-white transition-transform duration-300 ease-in-out ${
                authState === "Login"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={() => {
                if (authState === "Login") {
                  setAuthState("Logout");
                } else {
                  setAuthState("Login");
                }
              }}
            >
              {authState}
            </button>
          </li>
          <li className="p-4 m-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
