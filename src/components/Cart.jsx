import { useDispatch, useSelector } from "react-redux";
import ItemsList from "./ItemsList";
import { clearCart } from "../../utils/Redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <button
        className="m-2 p-2 bg-black text-white rounded-md"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <div className="w-6/12 mx-auto">
        <ItemsList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
