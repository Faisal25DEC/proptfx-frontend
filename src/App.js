import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="flex w-full justify-between  h-[100vh] overflow-hidden bg-neutral-900 text-white">
      <div className="flex-[2] w-full h-full">
        <Sidebar />
      </div>
      <div className="flex-[10] w-full h-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
