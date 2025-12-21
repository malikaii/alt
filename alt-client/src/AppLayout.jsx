import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Components/Navigation/Navbar";

function AppLayout() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-1/2 border-l-1 border-r-1 border-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
