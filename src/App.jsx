import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/pages/Home";
import { setProductList } from "./redux/slice/productSlice";
import { setPageValue } from "./redux/slice/pageSlice";

function App() {
  // const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limit] = useState(12);
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  const category = useSelector((state) => state.category.category);
  const page = useSelector((state) => state.page.page);

  // fetching initial Product Data
  const fetchProductData = async () => {
    try {
      console.log("fetchProductData called");
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`
      );

      const data = await response.json();
      console.log(data);
      dispatch(setProductList(data));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetching Product Data based on the Category
  const fetchProductDataWithCategory = async () => {
    try {
      console.log("fetchProductDataWithCategory called");

      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${
          limit * page
        }`
      );
      const data = await response.json();
      dispatch(setProductList(data));
    } catch (error) {
      setError(error.message);
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setPageValue(0));
  }, [category]);

  useEffect(() => {
    if (category == "") {
      fetchProductData();
    } else if (category !== "") {
      fetchProductDataWithCategory();
    }
  }, [page, limit, category]);

  // showing loading
  if (loading && productData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">
            Loading amazing products...
          </p>
        </div>
      </div>
    );
  }

  // showing error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-semibold text-red-600">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Home />
    </>
  );
}

export default App;
