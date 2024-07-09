import React, { useEffect, useState } from "react";
import UploadProduct from "../components/uploadProduct";
import Api from "../api";
import AdminProductCart from "../components/AdminProductCart";

const AllProducts = () => {
  const [openUploadPro, setOpenUploadPro] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllproduct = async () => {
    const response = await fetch(Api.allProduct.url);
    const dataRes = await response.json();
    setAllProduct(dataRes?.data || []);
  };
  useEffect(() => {
    fetchAllproduct();
  }, []);

  return (
    <div>
      <div className=" bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => setOpenUploadPro(true)}
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition py-1 px-3 rounded-full"
        >
          Upload Product
        </button>
      </div>
      {/* all Products  */}
      <div className="flex items-center  flex-wrap h-[calc(100vh-190px)] overflow-y-scroll gap-4 py-3">
        {allProduct.map((e, index) => {
          return (
            <AdminProductCart
              data={e}
              key={index + "allProduct"}
              fetchdata={fetchAllproduct}
            />
          );
        })}
      </div>

      {openUploadPro && (
        <UploadProduct
          onClose={() => setOpenUploadPro(false)}
          fetchData={fetchAllproduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
