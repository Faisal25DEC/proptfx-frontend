import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { Navigate } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const { auth } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    dispatch(loginUser(formData));
  };
  console.log(formData);
  if (auth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col gap-[25px] justify-center items-center h-full w-full">
      <h1 className="text-[24px]">Login To Vega </h1>
      <form
        action=""
        className="flex flex-col w-[30%] gap-[15px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="py-2 px-4 bg-neutral-800 rounded-md"
          onChange={handleFormFieldChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="py-2 px-4 bg-neutral-800 rounded-md"
          onChange={handleFormFieldChange}
        />

        <button
          type="submit"
          className="bg-red-500 rounded-md font-semibold text-[20px] border-none py-2 px-4"
        >
          Submit
        </button>
        <p className="text-center">
          Don't Have an Account?{" "}
          <span className="text-red-400 underline cursor-pointer">
            Register Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
