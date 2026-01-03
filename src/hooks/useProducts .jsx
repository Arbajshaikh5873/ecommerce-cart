import { useDispatch, useSelector } from "react-redux";
import { setProducts, setProductsLoading } from "../redux/slice/productsSlice";
import { useEffect } from "react";

const useProducts = (category = "", search = "", priceRange = "", page = 0) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.products);
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setProductsLoading(true));
      try {
        let url = "";
        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}`;
        } else if (category) {
          url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${
            limit * page
          }`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${
            limit * page
          }`;
        }

        const response = await fetch(url);
        const data = await response.json();

        let filteredProducts = data.products || [];

        if (priceRange) {
          const [min, max] = priceRange.split("-").map(Number);
          filteredProducts = filteredProducts.filter(
            (p) => p.price >= min && p.price <= max
          );
        }

        dispatch(
          setProducts({
            products: filteredProducts,
            total: search ? filteredProducts.length : data.total,
          })
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setProductsLoading(false));
      }
    };

    fetchProducts();
  }, [category, search, priceRange, page, dispatch]);

  return { products: list, total, loading };
};

export default useProducts;
