import React from "react";
import {
  FaClock,
  FaHome,
  FaPlusCircle,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
const Sidebar = () => {
  const { auth } = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const sidebarLinks = [
    {
      title: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      title: "Latest",
      path: "/latest",
      icon: FaRocket,
    },
    {
      title: "Watchlist",
      path: "/watchlist",
      icon: FaClock,
    },
    {
      title: "Top Rated",
      path: "/top-rated",
      icon: FaStar,
    },
    {
      title: "Add a Movie",
      path: "/add-movie",
      icon: FaPlusCircle,
    },
  ];
  return (
    <div className="w-[max-content] px-[50px] h-full border-r-[1px] border-neutral-100 flex flex-col justify-between py-4 pb-[60px]">
      <div className=" flex flex-col gap-[60px] h-[70%]">
        {" "}
        <p className="text-[36px]">Vega</p>{" "}
        <div className="flex flex-col items-start gap-[40px] cursor-pointer ">
          {sidebarLinks.map((item) => {
            const { path, title, icon: Icon } = item;
            return (
              <Link
                to={item.path}
                className={`flex items-center gap-[10px] ${
                  currentPath === path && "text-red-400"
                }`}
              >
                <div>
                  <Icon className="w-8 h-6" />
                </div>
                <p className="text-[18px]">{title}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-red-500 pl-[20px]">
        {auth ? (
          <Link
            onClick={() => {
              dispatch(logout());
            }}
          >
            <p>Logout</p>
          </Link>
        ) : (
          <Link to="/login">
            <p>Login</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
