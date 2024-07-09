import React, { useContext, useEffect, useState } from "react";
import Api from "../api";
import Context from "../context";
import displayINRCurrency from "../File/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(Api.addToCartProductView.url, {
      method: Api.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setdata(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };
  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(Api.updateCartProduct.url, {
      method: Api.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData) {
      fetchData();
    }
  };
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(Api.updateCartProduct.url, {
        method: Api.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData) {
        fetchData();
      }
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(Api.deleteCartProduct.url, {
      method: Api.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalqty = data.reduce(
    (previousvalue, currentValue) => previousvalue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.selling,
    0
  );

  // payment
  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_PUBLIC_KEY);

    const response = await fetch(Api.payment.url, {
      method: Api.payment.method,
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();

    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }

    console.log(responseData);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="py-3 bg-white">No Data..</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl ">
          {loading
            ? loadingCart.map((e, index) => {
                return (
                  <div
                    key={e + "Add To Cart loading" + index}
                    className="bg-slate-200 w-full h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart loading"}
                    className="bg-white w-full h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200 ">
                      <img
                        src={product?.productId?.productImg[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt="Cartimg"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* delete */}
                      <div
                        className=" absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-700 hover:text-white cursor-pointer "
                        onClick={() => {
                          deleteProduct(product?._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-600 ">
                        {product?.productId?.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className=" text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.selling)}
                        </p>
                        <p className=" text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.selling * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                          className=" flex justify-center items-center rounded hover:bg-red-600 hover:text-white  w-6 h-6  border border-red-700 text-red-600"
                        >
                          -
                        </button>
                        <span> {product?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                          className=" flex justify-center items-center rounded hover:bg-red-600 hover:text-white w-6 h-6  border border-red-700 text-red-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {data[0] && (
          <div className="mt-2 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-700 px-4 py-1 ">Summary</h2>
                <div className="flex justify-between items-center px-4 font-medium text-lg text-slate-700 gap-2">
                  <p>Quantity</p>
                  <p>{totalqty}</p>
                </div>
                <div className="flex justify-between items-center px-4 font-medium text-lg text-slate-700 gap-2">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 p-2 text-white w-full mt-4"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
