import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Api from "../api";
import VerticalProductCart from "../components/verticalProductCart";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  console.log("query-", query.search);
  const fetchProduct = async () => {
    setloading(true);
    const response = await fetch(Api.searchProduct.url + query.search);
    const dataRes = await response.json();
    setloading(false);
    setData(dataRes.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="conatiner mx-auto p-4 ">
      {loading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-lg font-semibold my-3 ">
        Search Result: {data.length}
      </p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg p-4 text-center">No Data found...</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalProductCart loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
