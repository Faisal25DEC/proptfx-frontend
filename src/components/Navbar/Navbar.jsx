import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center gap-[40px] text-[20px] py-2 px-4 justify-between">
      <div className="flex items-center gap-[40px]">
        <p>Movies</p>
        <p>Series</p>
        <div className="pt-2">
          <input
            type="text"
            className="bg-transparent border-[1px] border-neutral-300 py-2 px-4 rounded-[10px]"
            placeholder="Search for Movies"
          />
        </div>
      </div>
      <div className="flex gap-[20px] items-center ">
        <Link to="/signup">
          {" "}
          <button className="py-2 px-4 border-[1px] text-red-500 border-red-400 rounded-xl">
            Register
          </button>
        </Link>

        <button className="bg-red-500 py-2 px-4 rounded-xl ">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
