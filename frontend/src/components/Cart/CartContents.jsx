import React, { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";
import { toast } from "sonner";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      })
    );
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color })).then(
      () => {
        toast.success("Removed from Cart");
      }
    );
  };

  return (
    <>
      <div>
        {cart?.products?.map((product, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-24 object-cover mr-4 border-2 border-neutral-400 rounded blur-md transition-all duration-500"
                onLoad={(e) => e.target.classList.remove("blur-md")}
              />

              <div>
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500">
                  size: {product.size} | color: {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medim"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medim"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p>$ {product.price.toLocaleString()}</p>
              <button
                onClick={() => {
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  );
                }}
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartContents;
