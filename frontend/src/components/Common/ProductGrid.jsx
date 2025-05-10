import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <>
      <div className="mx-auto mt-12 mb-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item, index) => (
              <Link
                to={`/product/${item._id}`}
                key={index}
                className="bg-white h-96 rounded-lg mb-8"
              >
                <img
                  src={item.images[0]?.url}
                  alt={item.images[0]?.url}
                  className="rounded-lg w-72 object-cover h-80"
                />
                <div className="px-2 font-medium text-sm">{item.name}</div>
                <div className="px-2 text-gray-600 font-medium text-sm">
                  {item.price}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-red-800 font-semibold text-lg">No items found!</div>
        )}
      </div>
    </>
  );
};

export default ProductGrid;
