import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Protected from "./pages/Protected";
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
import { useSelector } from "react-redux";

const App = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userToken = useSelector((state) => state.auth.userToken);
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
          <Route path="not-found" element={<NotFound />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route element={<Protected adminOnly={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
