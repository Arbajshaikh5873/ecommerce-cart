import useCategory from "../hooks/useCategory";
import { useDispatch, useSelector } from "react-redux";
import { next, previous, setPageValue } from "../redux/slice/pageSlice";
import { setCategory } from "../redux/slice/categorySlice";
import { useEffect } from "react";

// Navbar Component
function Navbar({ search, setSearch, setPriceRange, priceRange }) {
  let categoryList = useCategory();
  const page = useSelector((state) => state.page.page);
  const total = useSelector((state) => state.product.total);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            ShopHub
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <select
              name="category"
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md bg-white cursor-pointer"
            >
              <option value="">All Categories</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replace(/-/g, " ")}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              name="priceRange"
              onChange={(e) => setPriceRange(e.target.value)}
              value={priceRange}
              className="px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md bg-white cursor-pointer"
            >
              <option value="">All Prices</option>
              <option value="0-100">₹0 – ₹100</option>
              <option value="100-300">₹100 – ₹300</option>
              <option value="300-600">₹300 – ₹600</option>
              <option value="600-1000">₹600 – ₹1000</option>
              <option value="1000-2000">₹1000 – ₹2000</option>
            </select>
          </div>

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md">
              <button
                disabled={page === 0}
                onClick={() => dispatch(previous())}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="text-sm font-medium text-gray-600 px-2">
                Page
              </span>

              <input
                type="number"
                min={1}
                max={Math.ceil(total / 12)}
                value={page + 1}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const maxPage = Math.ceil(total / 12) - 1;
                  dispatch(
                    setPageValue(
                      val >= 1 && val <= maxPage + 1
                        ? val - 1
                        : Math.min(Math.max(val - 1, 0), maxPage)
                    )
                  );
                }}
                className="w-16 text-center border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              />

              <button
                disabled={page >= Math.ceil(total / 12) - 1}
                onClick={() => dispatch(next())}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
