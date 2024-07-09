import React, { useState } from "react";
import Role from "../api/role";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Api from "../api";
import { toast } from "react-toastify";

const ChangeRole = ({ name, email, role, onClose, userId, callFunc }) => {
  const [userRole, setRole] = useState(role);

  const handleOnChange = (e) => {
    setRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchRes = await fetch(Api.updateUser.url, {
      method: Api.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchRes.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className=" fixed top-0 bottom-0 right-0 left-0  w-full h-full z-10  flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto max-w-sm bg-white w-full shadow-md p-4 ">
        <button className=" block ml-auto " onClick={onClose}>
          <IoMdCloseCircleOutline />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role: {role}</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChange}
          >
            {Object.values(Role).map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block border rounded-full px-3 py-1 bg-red-600 text-white hover:bg-red-700 "
        >
          Change role
        </button>
      </div>
    </div>
  );
};

export default ChangeRole;
