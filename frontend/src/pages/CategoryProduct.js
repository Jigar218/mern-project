import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../File/productCategory";
import VerticalProductCart from "../components/verticalProductCart";
import Api from "../api";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const location = useLocation();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((e) => {
    urlCategoryListObject[e] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategory, setFilterCategory] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(Api.filterProduct.url, {
      method: Api.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategory,
      }),
    });
    const dataRes = await response.json();
    setData(dataRes?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategory]);

  useEffect(() => {
    const arrayOfcategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((e) => e);
    setFilterCategory(arrayOfcategory);
    const urlFormat = arrayOfcategory.map((e, index) => {
      if (arrayOfcategory.length - 1 === index) {
        return `category=${e} `;
      }

      return `category=${e}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.selling - b.selling));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.selling - a.selling));
    }
  };

  useEffect(() => {}, [sortBy]);
  return (
    <div className="conatiner mx-auto p-4">
      {/* desktop */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base  border-slate-400 border-b text-center pb-1 uppercase font-medium text-slate-500">
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base  border-slate-400 border-b text-center pb-1 uppercase font-medium text-slate-500">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="px-4">
          <p className="font-medium text-lg my-2 text-slate-800">
            Search Results: {data.length}
          </p>
          <div className="min-h-[clac(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] ">
            {data.length !== 0 && (
              <VerticalProductCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
