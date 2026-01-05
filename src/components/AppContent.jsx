import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "../redux/slice/authSlice";
import Cart from "./Cart";
import Checkout from "./pages/CheckOut";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import OrderConfirmation from "./pages/OrderConfirmation";
import SignIn from "./pages/SignIn";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<LogIn />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  );
}

export default AppContent;
