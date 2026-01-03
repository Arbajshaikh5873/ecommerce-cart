import { useSelector, useDispatch } from "react-redux";

import Cart from "./Cart";
import { useEffect } from "react";
import { setCartList } from "../redux/slice/productsSlice";

function CartList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartList(JSON.parse(localStorage.getItem("cartList"))));
  }, []);

  const cartList = useSelector((state) => state.product.cartList);
  console.log("cartList component ", cartList);

  if (cartList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <svg
          className="w-24 h-24 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h4a2 2 0 002-2v-8m-6 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3.01"
          />
        </svg>
        <p className="text-xl font-semibold">Your cart is empty</p>
        <p className="text-sm mt-2">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartList.map((product) => (
        <Cart product={product} />
      ))}
    </div>
  );
}

export default CartList;
