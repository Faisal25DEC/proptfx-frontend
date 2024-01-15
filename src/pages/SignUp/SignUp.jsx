import React from "react";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-[25px] justify-center items-center h-full w-full">
      <h1 className="text-[24px]">Register To Vega </h1>
      <form action="" className="flex flex-col w-[30%] gap-[15px]">
        <input
          type="text"
          name="name"
          id=""
          className="py-2 px-4 bg-neutral-800 rounded-md"
        />
        <input
          type="email"
          name="email"
          className="py-2 px-4 bg-neutral-800 rounded-md"
        />
        <input
          type="password"
          name="password"
          className="py-2 px-4 bg-neutral-800 rounded-md"
        />
        <input
          type="password"
          name="confirmPassword"
          className="py-2 px-4 bg-neutral-800 rounded-md"
        />
        <button
          type="submit"
          className="bg-red-500 rounded-md font-semibold text-[20px] border-none py-2 px-4"
        >
          Submit
        </button>
        <p className="text-center">
          Already Have an Account?{" "}
          <span className="text-red-400 underline cursor-pointer">
            Login Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
