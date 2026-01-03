import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./pages/CheckOut";
import Home from "./pages/Home";
import OrderConfirmation from "./pages/OrderConfirmation";

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  );
}

export default AppContent;
