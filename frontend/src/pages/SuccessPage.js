import React from "react";
import success from "../assest/success.gif";
import { Link } from "react-router-dom";
const SuccessPage = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center m-2 rounded flex-col p-4">
      <img src={success} alt="img" width={150} height={150} />
      <p className="text-green-600 text-xl font-bold  ">
        Payment Done Successfully!
      </p>
      <Link
        to={"/order"}
        className="p-2  mt-5 px-3 rounded font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white"
      >
        See Order
      </Link>
    </div>
  );
};

export default SuccessPage;
