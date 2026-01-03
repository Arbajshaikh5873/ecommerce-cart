import { useDispatch } from "react-redux";
import { loadCart, setLoading } from "../redux/slice/cartSlice";
import { useEffect } from "react";

// ==================== CUSTOM HOOKS ====================
const useLoadCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCartFromStorage = async () => {
      dispatch(setLoading(true));
      try {
        if (window.Storage) {
          const result = await window.Storage.get("cart", false);
          if (result?.value) {
            const cartData = JSON.parse(result.value);
            dispatch(loadCart(cartData));
          } else {
            dispatch(loadCart({ items: [], coupon: null }));
          }
        }
      } catch (error) {
        console.log("No saved cart found");
        dispatch(loadCart({ items: [], coupon: null }));
      }
    };
    loadCartFromStorage();
  }, [dispatch]);
};

export default useLoadCart;
