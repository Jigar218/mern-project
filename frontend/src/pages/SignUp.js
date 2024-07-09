import React, { useState } from "react";
import loginImg from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase from "../File/imageTobase";
import Api from "../api";
import { toast } from "react-toastify";
const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profile: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmpassword) {
      const dataRes = await fetch(Api.signUp.url, {
        method: Api.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataRes.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      console.log(dataApi);
    } else {
      toast.error("Password not match!");
      console.log("Password not match!");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase(file);
    setdata((prev) => {
      return {
        ...prev,
        profile: imagePic,
      };
    });
    // console.log("File", imagePic);
  };
  console.log("data ", data);

  return (
    <>
      <section id="signup">
        <div className="mx-auto container p-4 ">
          <div className="bg-white p-5 py-5 w-full  max-w-sm mx-auto  ">
            <div className="w-20 h-20 mx-auto relative  overflow-hidden rounded-full">
              <div>
                <img src={data.profile || loginImg} alt="loginimg" />
              </div>

              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-1 cursor-pointer text-center absolute bottom-0 w-full ">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden "
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>
            <form
              className=" pt-6 flex flex-col gap-2 "
              onSubmit={handleSubmit}
            >
              <div className="grid">
                <label>Name:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    placeholder="Enter Name"
                    className="w-full h-full outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

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
                    required
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
                    required
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
              </div>

              <div>
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                    required
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setConfirmPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-red-600 w-full text-white px-6 py-2 max-w-[150px] rounded-full hover:bg-red-700 hover:scale-110 transition-all mx-auto block mt-6">
                Sign Up
              </button>
            </form>
            <p className="my-1 ">
              Already have Account ?{" "}
              <Link
                to={"/login"}
                className="hover:text-red-600 text-red-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
