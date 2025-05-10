import React from "react";
import ProductDetails from "../components/Layout/ProductDetails";

const Product = () => {
  const product = {
    _id: "235353fdfdsfsa",
    name: "Stylish-Hoodie Jacket",
    price: 999,
    originalPrice: 1299,
    description: "Stylish Hoodie Jacket, perfect at everywhere",
    brand: "Nike",
    material: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517942420142-6a296f9ee4b1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Jacket",
      },
      {
        url: "https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Jacket",
      },
    ],
  };

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default Product;
