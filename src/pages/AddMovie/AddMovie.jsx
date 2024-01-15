import React from "react";
import { useSelector } from "react-redux";
import NotAuthorized from "../../assets/not-authorized.png";

const AddMovie = () => {
  const { currentUser } = useSelector((store) => store.user);
  return currentUser.role === "admin" ? (
    <div>Add a movie</div>
  ) : (
    <div className="h-full text-red-400 flex flex-col items-center justify-center gap-[40px]">
      <h1 className="text-[52px] text-center w-[50%]">
        Sorry, You Are Not Authorized To Add a Movie. Logout And Enter As An
        Admin
      </h1>
      <img src={NotAuthorized} alt="" />
    </div>
  );
};

export default AddMovie;
