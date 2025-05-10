import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-500 mb-4">
              Be the first to hear about new products, exclusive events and
              online offers.
            </p>
            <p className="text-sm font-medium text-gray-600 mb-4">
              Sign up and get 10% off on your first order.
            </p>
            <form className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-black text-sm text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
          {/* Shop Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  to="/collections/all?gender=Male&category=Top Wear"
                  className="hover:text-gray-500 transition-colors"
                >
                  Men's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Female&category=Top Wear"
                  className="hover:text-gray-500 transition-colors"
                >
                  Womens's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Male&category=Bottom Wear"
                  className="hover:text-gray-500 transition-colors"
                >
                  Men's Bottom Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Female&category=Bottom Wear"
                  className="hover:text-gray-500 transition-colors"
                >
                  Womens's Bottom Wear
                </Link>
              </li>
            </ul>
          </div>
          {/* Supports Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-gray-500 transition-colors"
                ></Link>
                Features
              </li>
            </ul>
          </div>
          {/* Follow us */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4 mb-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandMeta className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-500">Call Us</p>
            <p>
              <FiPhoneCall className="inline-block h-5 w-5 mr-2" />
              +977 9834435723
            </p>
          </div>
        </div>
        {/* Fottor Bottom */}
        <div className="container mx-auto my-6 px-4 lg:px-0 border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-sm tracking-tigher text-center">
            &copy; 2025, All rights reserved!
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
