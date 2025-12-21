import React, { useEffect } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer/Footer.jsx";
import { useDispatch } from "react-redux";
import { handleToken } from "../../Redux/userSlice.js";

export default function Layout() {
  const disp = useDispatch();
  useEffect(() => {
    disp(handleToken());
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
