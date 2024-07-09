import React, { useEffect, useState } from "react";
import Api from "../api";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [loading, setloading] = useState(false);
  const categoryloading = new Array(13).fill(null);
  const fetchCategoryProduct = async () => {
    setloading(true);
    const response = await fetch(Api.categoryProduct.url);
    const dataRes = await response.json();
    setloading(false);
    setcategoryProduct(dataRes.data);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="conatiner mx-auto p-4 ">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar">
        {loading
          ? categoryloading.map((e, index) => {
              return (
                <div
                  className="h-16 md:w-20 md:h-20 rounded-full   overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryloading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  <div className="w-20 h-20 md:w-20 md:h-20 flex items-center justify-center rounded-full overflow-hidden p-4 bg-slate-200  transition-all scale-100 ">
                    <img
                      src={product?.productImg[0]}
                      alt={product?.category}
                      className="h-full  object-scale-down mix-blend-multiply hover:scale-125 transition-all "
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize ">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
