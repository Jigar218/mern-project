import React, { useContext, useState } from "react";
import loginImg from "../assest/loginpic.webp";
import { FaRegEye } from "react-icons/fa";
import Api from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import Context from "../context";

const Login = () => {
  const [showPassword, setPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserdetails, fetchUserAddToCart } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataRes = await fetch(Api.login.url, {
      method: Api.login.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataRes.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserdetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }

    console.log(dataApi);
  };
  console.log("data ", data);

  return (
    <>
      <section id="login">
        <div className="mx-auto container p-4 ">
          <div className="bg-white p-5 py-5 w-full  max-w-sm mx-auto ">
            <div className="w-32 h-32 mx-auto img ">
              <img src={loginImg} alt="loginimg" />
            </div>
            <form
              className=" pt-6 flex flex-col gap-2 "
              onSubmit={handleSubmit}
            >
              <div className="grid">
                <label>Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="Enter email"
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label>Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setPassword((prev) => !prev)}
                  >
                    <span>
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-red-700"
                >
                  Forgot Password ?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-gray-900 w-full text-white px-6 py-2 max-w-[150px] rounded-full hover:bg-gray-950 hover:scale-105 transition-all mx-auto block mt-6"
              >
                Login
              </button>
            </form>
            <p className="my-1 ">
              Don't have Account ?{" "}
              <Link
                to={"/sign-up"}
                className="hover:text-red-700 text-red-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
