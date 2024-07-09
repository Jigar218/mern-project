import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../File/fetchCategoryWiseProduct";
import displayINRCurrency from "../File/DisplayCurrency";

import { Link } from "react-router-dom";
import addToCart from "../File/AddToCart";
import Context from "../context";
import scrollTop from "../File/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setdata(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl  font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:w-[320px] bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center  animate-pulse"></div>

                  <div className="p-3.5 grid gap-3">
                    <h2 className="font-medium md:text-lg  text-base text-ellipsis line-clamp-1 p-1 py-2 animate-pulse rounded-full bg-slate-200">
                      {""}
                    </h2>
                    <p className="capitalize text-slate-500 animate-pulse rounded-full bg-slate-200  py-2 p-1"></p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium animate-pulse rounded-full bg-slate-200  p-1 w-full"></p>
                      <p className="text-slate-500 line-through  p-1 animate-pulse rounded-full py-2 bg-slate-200 w-full"></p>
                    </div>
                    <button className="bg-slate-200 text-white px-3 py-2 animate-pulse rounded-full"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:w-[320px] bg-white rounded-sm shadow "
                  onClick={scrollTop}
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product.productImg[0]}
                      alt="category"
                      className="object-scale-down  h-full  hover:scale-125 transition-all mix-blend-multiply"
                    />
                  </div>

                  <div className="p-3.5 grid gap-3">
                    <h2 className="font-medium md:text-lg  text-base text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.selling)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => {
                        handleAddToCart(e, product?._id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
