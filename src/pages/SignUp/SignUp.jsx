import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../store/userSlice";
import { Link } from "react-router-dom";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};
const SignUp = () => {
  const { auth, signup } = useSelector((store) => store.user);
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
    dispatch(signupUser(formData));
  };

  return (
    <div className="flex flex-col gap-[25px] justify-center items-center h-full w-full">
      <h1 className="text-[24px]">Register To Vega </h1>
      <form
        action=""
        className="flex flex-col w-[30%] gap-[15px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          id=""
          className="py-2 px-4 bg-neutral-800 rounded-md"
          onChange={handleFormFieldChange}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
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
          Already Have an Account?{" "}
          <Link to="/login">
            <span className="text-red-400 underline cursor-pointer">
              Login Here
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
