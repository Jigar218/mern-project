import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../File/productCategory";
import { IoMdCloudUpload } from "react-icons/io";
import uploadimage from "../File/uploadimage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import Api from "../api";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImg: [],
    description: "",
    price: "",
    selling: "",
  });

  const [openFullImage, setOpenFullImage] = useState(false);

  const [fullImage, setFullImage] = useState("");
  // const [uploadProductImage, setuploadProductImage] = useState("");
  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadproduct = async (e) => {
    const file = e.target.files[0];
    // setuploadProductImage(file.name);
    // console.log("File", file);
    const uploadImageCloud = await uploadimage(file);
    setData((prev) => {
      return {
        ...prev,
        productImg: [...prev.productImg, uploadImageCloud.url],
      };
    });

    // console.log("upload-image", uploadImageCloud.url);
  };

  const handleDeleteProductImg = async (index) => {
    const newProductImage = [...data.productImg];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImg: [...newProductImage],
      };
    });
  };

  const submithandle = async (e) => {
    e.preventDefault();

    const response = await fetch(Api.uploadProduct.url, {
      method: Api.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed bg-slte-200  bg-opacity-35 w-full h-full  top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden ">
        <div className=" flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg ">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-700 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form
          className="grid p-4 pb-20  gap-2 overflow-y-scroll h-full"
          onSubmit={submithandle}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            className="p-2 bg-slate-100 border rounded "
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnChnage}
          />
          <label className="mt-1" htmlFor="brandtName">
            Brand Name:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded "
            name="brandName"
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOnChnage}
          />
          <label htmlFor="category" className="mt-1">
            Category:
          </label>

          <select
            className="p-2 bg-slate-100 border rounded "
            value={data.category}
            name="category"
            onChange={handleOnChnage}
          >
            <option value={""}>Select Category</option>

            {productCategory.map((e, index) => {
              return (
                <option key={e.value + index} value={e.value}>
                  {e.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImg" className="mt-3">
            Product Image:
          </label>
          <label className="" htmlFor="uploadImgInput">
            <div className="bg-slate-100 p-2 rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl ">
                  <IoMdCloudUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImgInput"
                  className="hidden"
                  onChange={handleUploadproduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImg[0] ? (
              <div className="flex items-center gap-2">
                {data.productImg.map((e, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={e}
                        alt={e}
                        width={80}
                        height={80}
                        className="bg-slate-100 cursor-pointer border"
                        onClick={() => {
                          setOpenFullImage(true);
                          setFullImage(e);
                        }}
                      />

                      <div
                        onClick={() => {
                          handleDeleteProductImg(index);
                        }}
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600  cursor-pointer rounded-full hidden group-hover:block"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded "
            name="price"
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChnage}
          />
          <label htmlFor="selling" className="mt-3">
            Selling Price:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded "
            name="selling"
            type="number"
            id="selling"
            placeholder="Enter Selling Pice"
            value={data.selling}
            onChange={handleOnChnage}
          />

          <label htmlFor="description" className="mt-3">
            Description:
          </label>

          <textarea
            className="h-28 bg-slate-100 border resize-none p-1 "
            placeholder="Enter Product Description"
            rows={3}
            onChange={handleOnChnage}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-1 text-white mb-10 hover:bg-red-700 bg-red-600">
            Upload Product
          </button>
        </form>
      </div>
      {openFullImage && (
        <DisplayImage
          onClose={() => setOpenFullImage(false)}
          imgUrl={fullImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
