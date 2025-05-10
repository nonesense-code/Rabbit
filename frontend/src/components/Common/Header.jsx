import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <Topbar className="absolute" />
      <Navbar />
    </>
  );
};

export default Header;
