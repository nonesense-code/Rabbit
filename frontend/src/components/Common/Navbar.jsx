import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { MdLogin } from "react-icons/md";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userInfo = useSelector((state) => state.auth.user);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-center py-2 px-6">
        {/* For any given width the mx-auto centers any div to the center */}
        <div className="navbarContainer flex items-center justify-between p-4 h-12 w-full tracking-tighter">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">Rabbit</Link>
          </div>
          {/* Menu */}
          <div className="hidden md:flex items-center space-x-2 text-sm font-semibold">
            <Link
              className="uppercase text-gray-700 hover:text-black"
              to="/collections/all?gender=Male"
            >
              Men
            </Link>
            <Link
              className="uppercase text-gray-700 hover:text-black"
              to="/collections/all?gender=Female"
            >
              Women
            </Link>
            <Link
              className="uppercase text-gray-700 hover:text-black"
              to="/collections/all?category=Top Wear"
            >
              Top Wear
            </Link>
            <Link
              className="uppercase text-gray-700 hover:text-black"
              to="/collections/all?category=Bottom Wear"
            >
              Bottom Wear
            </Link>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                className="uppercase rounded-lg text-sm bg-black text-white px-2 py-1 tracking-wide"
                to="/admin"
              >
                Admin
              </Link>
            )}
            {!userInfo ? (
              <Link
                to="/login"
                className="hover:bg-sky-600 hover:text-white hover:border-gray-600 transition-colors duration-400 ease-in flex items-center gap-1 justify-center border-2 p-1 rounded-md"
              >
                <MdLogin className="h-6 w-6 text-gray-700" />
                <p className="text-sm font-medium rounded-md">Log In</p>
              </Link>
            ) : (
              <Link to="/profile" className="hover:text-black">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
            )}

            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute h-4 w-4 rounded-full bg-rabbit-red top-0 left-3 flex items-center justify-center text-xs text-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="overflow-hidden">
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer} className="lg:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Male"
              onClick={toggleNavDrawer}
              className="block text-gray-800 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Female"
              onClick={toggleNavDrawer}
              className="block text-gray-800 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-800 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-800 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
