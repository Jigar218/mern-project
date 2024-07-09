import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import displayINRCurrency from "../File/DisplayCurrency";
// import VerticalCartProduct from "../components/VerticalCartProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../File/AddToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImg: [],
    description: "",
    price: "",
    selling: "",
  });
  const params = useParams();
  const [loading, setloading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [active, setActive] = useState("");
  const [zoomImageCoordinate, setzoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);
  const [zoomImage, setZoomImage] = useState(false);
  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(Api.productDetails.url, {
      method: Api.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setloading(false);
    const dataRes = await response.json();

    setData(dataRes?.data);
    setActive(dataRes?.data.productImg[0]);
  };

  console.log("data", data);
  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActive(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("cor", left, top, height, width);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setzoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );
  const handleZoomLeaveImage = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };
  return (
    <div className="container mx-auto p-4 ">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={active}
              alt="img "
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomLeaveImage}
            />
            {/* {"Zoom"} */}

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0  overflow-hidden">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${active})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar h-full">
                {productImageListLoading.map((e, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar h-full">
                {data?.productImg?.map((imageURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded "
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer "
                        alt="imgDisplay"
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid w-full  gap-1">
            <p className="bg-slate-200 animate-pulse rounded-full  lg:h-8 h-6 w-full   inline-block  "></p>
            <h2 className="text-2xl lg:text-4xl font-medium  bg-slate-200 animate-pulse rounded-full lg:h-8 h-6 w-full">
              {""}
            </h2>
            <p className="bg-slate-200 animate-pulse rounded-full lg:h-8 h-6 w-full "></p>
            <div className="text-red-600 flex items-center gap-1 bg-slate-200 animate-pulse rounded-full lg:h-8 h-6 w-full"></div>
            <div className="flex items-center gap-2 text-1xl font-medium my-1 ">
              <p className="  bg-slate-200 animate-pulse rounded-full  h-6 w-full lg:h-8 "></p>
              <p className="bg-slate-200 animate-pulse rounded-full  h-6 w-full lg:h-8"></p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button className="bg-slate-200 animate-pulse rounded-full  h-6 lg:h-8 w-full "></button>
              <button className="  min-w-[120px] bg-slate-200 animate-pulse rounded-full w-full lg:h-8 h-6"></button>
            </div>
            <div className="w-full">
              <p className=" bg-slate-200 my-1 animate-pulse rounded-full w-full  lg:h-8 h-6"></p>
              <p className="bg-slate-200 animate-pulse rounded-full w-full lg:h-12  h-10"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit  ">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-500 ">{data.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />

              <IoStarHalf />
            </div>
            <div className="flex items-center gap-2 text-1xl font-medium my-1 lg:text-3xl">
              <p className=" text-red-600  ">
                {displayINRCurrency(data?.selling)}
              </p>
              <p className="text-slate-500 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="border-2 border-yellow-600  bg-yellow-500 rounded  px-3 py-1  min-w-[120px] my-2 text-Black  font-semibold hover:bg-yellow-600 hover:text-black "
                onClick={(e) => handleBuyProduct(e, data._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-orange-600 rounded  px-3 py-1  min-w-[120px] my-2 text-white bg-orange-600 hover:bg-orange-700"
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
