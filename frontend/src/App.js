import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Api from "./api";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const disptach = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserdetails = async () => {
    const dataResponse = await fetch(Api.current_user.url, {
      method: Api.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      disptach(setUserDetails(dataApi.data));
    }
    // console.log(dataApi);
  };
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(Api.addToCartProductCount.url, {
      method: Api.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };
  useEffect(() => {
    fetchUserdetails();
    fetchUserAddToCart();
  });

  return (
    <>
      <Context.Provider
        value={{
          fetchUserdetails,
          cartProductCount,

          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-110px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
