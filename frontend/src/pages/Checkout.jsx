import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 225,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 345,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShipppingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* Left Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl uppercase mb-6">Checkout</h2>
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mv-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value="user@example.com"
                className="w-full p-2 border rounded"
                disabled
              />
            </div>
            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShipppingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShipppingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShipppingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShipppingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShipppingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShipppingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="number"
                // value={shippingAddress.phone}
                onChange={(e) => ({
                  ...shippingAddress,
                  phone: e.target.value,
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-6">
              {!checkoutId ? (
                <button
                  className="w-full bg-black text-white py-3 rounded"
                  type="sumbit"
                >
                  Continue to Payment
                </button>
              ) : (
                <div className="">
                  <h3 className="text-lg mb-4">Pay with Paypal</h3>
                  {/* Paypal button component */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
