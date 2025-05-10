import React from "react";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  const params = new URLSearchParams();
  params.set("search", searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/collections/all?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`flex items-center justify-center w-full transition-all duration-200 ${
          isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
        }`}
      >
        {isOpen ? (
          <form
            onSubmit={handleSearch}
            className="relative flex items-center justify-center w-full"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-1/2"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              />
              {/* Search icon */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
              </button>
            </motion.div>

            {/* Close button */}
            <button
              onClick={handleSearchToggle}
              type="button"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMiniXMark className="h-5 w-5 text-gray-700" />
            </button>
          </form>
        ) : (
          <div onClick={handleSearchToggle} type="submit" className="h-6 w-6">
            <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
