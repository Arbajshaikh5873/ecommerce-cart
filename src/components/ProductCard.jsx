import { useEffect, useMemo, useState } from "react";

import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { setPageValue } from "../redux/slice/pageSlice";
import { setProductList } from "../redux/slice/productSlice";

// ProductCard Component
function ProductCard({ search, priceRange }) {
  const productData = useSelector((state) => state.product.productList);
  const page = useSelector((state) => state.page.page);
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // based on the search show products
  const fetchData = async () => {
    if (search) {
      try {

        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/search?q=${search}`
        );

        const data = await response.json();

        setFilteredProducts(data.products || []);
        
      } catch (error) {
        console.error("Search error:", error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredProducts(Array.isArray(productData) ? productData : []);
    }
  };
  useEffect(() => {
    fetchData();
  }, [search, productData]);

  // Apply price filter with useMemo for optimization
  const finalProducts = useMemo(() => {
    if (!priceRange) return filteredProducts;

    const [min, max] = priceRange.split("-").map(Number);
    return filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
  }, [filteredProducts, priceRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (finalProducts.length === 0) {
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xl font-semibold">No products found</p>
        <p className="text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {finalProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductCard;
