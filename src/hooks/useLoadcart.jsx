import { useDispatch, useSelector } from "react-redux";
import { loadCart, setLoading } from "../redux/slice/cartSlice";
import { useEffect } from "react";

// ==================== CUSTOM HOOKS ====================
const useLoadCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const loadCartFromStorage = () => {
      dispatch(setLoading(true));
      try {
        const storageKey = user?.email ? `cart_${user.email}` : "cart";
        const cartData = localStorage.getItem(storageKey);
        if (cartData) {
          const parsedData = JSON.parse(cartData);
          dispatch(loadCart(parsedData));
        } else {
          dispatch(loadCart({ items: [], coupon: null }));
        }
      } catch (error) {
        console.log("No saved cart found");
        dispatch(loadCart({ items: [], coupon: null }));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadCartFromStorage();
  }, [dispatch, user?.email]);
};

export default useLoadCart;
