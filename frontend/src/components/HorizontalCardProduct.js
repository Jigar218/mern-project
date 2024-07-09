import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../File/fetchCategoryWiseProduct";
import displayINRCurrency from "../File/DisplayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../File/AddToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

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

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl  font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md p-2 rounded-full absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md p-2 rounded-full absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:w-[320px] h-36 bg-white rounded-sm shadow flex  ">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse "></div>

                  <div className="p-4 grid  gap-2 w-full">
                    <h2 className="font-medium md:text-lg  text-base text-ellipsis p-1 line-clamp-1 rounded-full bg-slate-200 animate-pulse">
                      {" "}
                    </h2>
                    <p className="capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-white px-3 py-0.5 rounded-full w-full text-sm bg-slate-200 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:w-[320px] h-36 bg-white rounded-sm shadow flex  "
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] ">
                    <img
                      src={product.productImg[0]}
                      alt="category"
                      className="object-scale-down  h-full  hover:scale-125 transition-all"
                    />
                  </div>

                  <div className="p-3.5 grid">
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
                      onClick={(e) => handleAddToCart(e, product?._id)}
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

export default HorizontalCardProduct;
