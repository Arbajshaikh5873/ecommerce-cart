import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import useLoadCart from "../hooks/useLoadcart";
import { useMemo, useState } from "react";
import Navbar from "./Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.cart.coupon);
  const user = useSelector((state) => state.auth.user);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  useLoadCart();

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME: 15,
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const discount = useMemo(() => {
    if (coupon) {
      return (subtotal * coupon.percentage) / 100;
    }
    return 0;
  }, [subtotal, coupon]);

  const tax = useMemo(() => (subtotal - discount) * 0.1, [subtotal, discount]);
  const total = useMemo(
    () => subtotal - discount + tax,
    [subtotal, discount, tax]
  );

  const handleApplyCoupon = () => {
    if (coupons[couponCode]) {
      dispatch(
        applyCoupon({
          code: couponCode,
          percentage: coupons[couponCode],
          userId: user?.email,
        })
      );
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          search=""
          setSearch={() => {}}
          category=""
          setCategory={() => {}}
          priceRange=""
          setPriceRange={() => {}}
        />
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19"
            />
          </svg>
          <p className="text-xl font-semibold">Your cart is empty</p>
          <Link
            to="/"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        search=""
        setSearch={() => {}}
        category=""
        setCategory={() => {}}
        priceRange=""
        setPriceRange={() => {}}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        decrementQuantity({ id: item.id, userId: user?.email })
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        incrementQuantity({ id: item.id, userId: user?.email })
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({ id: item.id, userId: user?.email })
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {coupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({coupon.code}):</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="w-full px-4 py-2 border rounded-lg mb-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
              >
                Apply Coupon
              </button>
              {couponError && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Try: SAVE10, SAVE20, WELCOME
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
