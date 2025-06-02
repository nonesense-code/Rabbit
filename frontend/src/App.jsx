import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import Checkout from "./pages/Checkout";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import Product from "./pages/Product";
import ScrollToTop from "./scrollToTop";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        duration={1000}
        hoverPause={false}
        position="top-right"
        // richColors
        toastOptions={{
          style: {
            transition: "transform ease-in-out, 0.2s ease",
          },
          className: "custom-toast",
        }}
      />
      <ScrollToTop />
      <Routes>
        {/*user layout*/}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
