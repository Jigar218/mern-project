import React from "react";
import cancel from "../assest/cancel.png";
import { Link } from "react-router-dom";
const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center m-2 rounded flex-col p-4">
      <img
        src={cancel}
        alt="img"
        width={150}
        height={150}
        className="mix-blend-multiply"
      />
      <p className="text-red-600 text-xl font-bold  ">Payment Cancel!</p>
      <Link
        to={"/cart"}
        className="p-2  mt-5 px-3 rounded font-semibold text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default Cancel;
