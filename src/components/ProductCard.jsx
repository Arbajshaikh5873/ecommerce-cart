
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

// ProductCard Component
// function ProductCard({ search, priceRange }) {
//   const productData = useSelector((state) => state.product.productList);
//   const page = useSelector((state) => state.page.page);
//   const category = useSelector((state) => state.category.category);
//   const dispatch = useDispatch();

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [limit] = useState(12);

//   // fetching Product Data based on the Category
//   const fetchProductDataWithCategory = async () => {
//     try {
//       console.log("fetchProductDataWithCategory called");

//       setLoading(true);
//       const response = await fetch(
//         `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${
//           limit * page
//         }`
//       );
//       const data = await response.json();
//       dispatch(setProductList(data));
//     } catch (error) {
//       setError(error.message);
//       console.error("Error fetching category products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductData = async () => {
//     try {
//       console.log("fetchProductData called");
//       setLoading(true);

//       const response = await fetch(
//         `https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`
//       );

//       const data = await response.json();
//       console.log(data);
//       dispatch(setProductList(data));
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Initial Fetching Data
//   useEffect(() => {
//     dispatch(setPageValue(0));
//     if (category == "") {
//       fetchProductData();
//     } else if (category !== "") {
//       fetchProductDataWithCategory();
//     }
//   }, [page, limit, category]);

//   // useEffect(() => {
//   //   dispatch(setPageValue(0));
//   // }, [category]);
//   // fetching initial Product Data

//   // based on the search show products
//   const fetchData = async () => {
//     if (search) {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           `https://dummyjson.com/products/search?q=${search}`
//         );

//         const data = await response.json();

//         setFilteredProducts(data.products || []);
//       } catch (error) {
//         console.error("Search error:", error);
//         setFilteredProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setFilteredProducts(Array.isArray(productData) ? productData : []);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [search, productData, page]);

//   // Apply price filter with useMemo for optimization
//   const finalProducts = useMemo(() => {
//     if (!priceRange) return filteredProducts;

//     const [min, max] = priceRange.split("-").map(Number);
//     return filteredProducts.filter(
//       (product) => product.price >= min && product.price <= max
//     );
//   }, [filteredProducts, priceRange]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (finalProducts.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
//         <svg
//           className="w-24 h-24 mb-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//         <p className="text-xl font-semibold">No products found</p>
//         <p className="text-sm mt-2">Try adjusting your filters</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
//       {finalProducts.map((product) => (
//         <Product key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

// ==================== PRODUCT CARD ====================
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {Math.round(product.discountPercentage)}% OFF
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
            {product.category}
          </span>
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isInCart}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            product.stock > 0 && !isInCart
              ? "bg-green-500 hover:bg-green-600 active:scale-95"
              : isInCart
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.stock > 0
            ? isInCart
              ? "Added to Cart"
              : "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
