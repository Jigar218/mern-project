import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../File/DisplayCurrency";

const AdminProductCart = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div>
      <div className="bg-white p-4 rounded ml-6 ">
        <div className="w-40  ">
          <div className="w-32 h-32 flex justify-center items-center ">
            <img
              src={data?.productImg[0]}
              alt="proimg"
              width={100}
              height={100}
              className="object-fill h-full mx-auto"
            />
          </div>
          <h1 className=" text-ellipsis line-clamp-2 text-center">
            {data.productName}
          </h1>
          <div>
            <div>
              <p className="font-semibold text-center">
                {displayINRCurrency(data.selling)}
              </p>
            </div>
            <div
              className="w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white "
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
          </div>
        </div>
        {editProduct && (
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchdata={fetchdata}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductCart;
