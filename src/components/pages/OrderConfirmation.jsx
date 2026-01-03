import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

// ==================== ORDER CONFIRMATION ====================
const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        search=""
        setSearch={() => {}}
        category=""
        setCategory={() => {}}
        priceRange=""
        setPriceRange={() => {}}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">Thank you for your purchase</p>
            <p className="text-sm text-gray-500 mt-2">Order ID: #{order.id}</p>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            <div className="space-y-3 mb-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.coupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({order.coupon.code}):</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Shipping Address</h3>
            <p className="text-gray-700">{order.formData.fullName}</p>
            <p className="text-gray-700">{order.formData.address}</p>
            <p className="text-gray-700">
              {order.formData.city}, {order.formData.zipCode}
            </p>
            <p className="text-gray-700">{order.formData.email}</p>
            <p className="text-gray-700">{order.formData.phone}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Payment Method</h3>
            <p className="text-gray-700 capitalize">
              {order.formData.paymentMethod.replace("-", " ")}
            </p>
          </div>

          <Link
            to="/"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
