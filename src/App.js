import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AddMovie from "./pages/AddMovie/AddMovie";

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="flex w-full justify-between  h-[100vh] overflow-hidden bg-neutral-900 text-white">
      {!(currentPath === "/signup" || currentPath === "/login") && (
        <div className="w-[max-content]  h-full">
          <Sidebar />
        </div>
      )}

      <div className="flex-[9] w-[95%] h-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
