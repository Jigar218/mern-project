import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../api";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Role from "../api/role";

import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll("q");
  const [search, setsearch] = useState(searchQuery);
  const handleLogout = async () => {
    const fetchData = await fetch(Api.logout.url, {
      method: Api.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setsearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white  fixed w-full z-40">
      <div className="container px-4 mx-auto h-full flex items-center justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo h={30} w={60} />
          </Link>
        </div>
        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full border-black focus-within:shadow-md pl-2 ">
          <input
            type="text"
            placeholder="Search Product here"
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center  font-bold justify-center rounded-r-full text-black ">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setDisplay((prev) => !prev)}
              >
                {user?.profile ? (
                  <img
                    src={user?.profile}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}

            {/* hidden group-hover:block */}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === Role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-200 p-2"
                      onClick={() => setDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-200 p-2"
                    onClick={() => setDisplay((prev) => !prev)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative ">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute  -top-2 -right-3 ">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            <div>
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full hover:bg-red-700 text-white bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <div>
                  <Link
                    to={"login"}
                    className="px-3 py-1 font-medium shadow-sm hover:border-black hover:rounded-full hover:border-b-2 "
                  >
                    Login
                  </Link>
                  <Link
                    to={"sign-up"}
                    className="px-3 py-1 ml-2 rounded-full btn"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
