import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import useProducts from "../../hooks/useProducts ";
import useLoadCart from "../../hooks/useLoadcart";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [page, setPage] = useState(0);

  useLoadCart();
  const { products, total, loading } = useProducts(
    category,
    search,
    priceRange,
    page
  );

  useEffect(() => {
    setPage(0);
  }, [category, search, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
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
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!search && total > 12 && (
            <div className="flex justify-center items-center gap-4 py-8">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Page {page + 1} of {Math.ceil(total / 12)}
              </span>
              <button
                disabled={page >= Math.ceil(total / 12) - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
