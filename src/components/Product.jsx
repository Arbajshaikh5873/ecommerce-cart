function Product({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {product.discountPercentage}% OFF
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
            ₹{product.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
          {product.description}
        </p>

        <button
          disabled={product.availabilityStatus !== "In Stock"}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            product.availabilityStatus === "In Stock"
              ? "bg-green-500 hover:bg-green-600 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.availabilityStatus === "In Stock"
            ? "Buy Now"
            : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}
export default Product;
