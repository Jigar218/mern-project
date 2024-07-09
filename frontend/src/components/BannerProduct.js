import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/ban.jpg";
import image2Mobile from "../assest/banner/ban3.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/ban4.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImage = [image1, image2, image3, image4, image5];
  const MobileImage = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextimage = () => {
    if (desktopImage.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const previmage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImage.length - 1 > currentImage) {
        nextimage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className=" flex w-full text-2xl justify-between ">
            <button
              className="bg-white shadow-md p-2 rounded-full"
              onClick={previmage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md p-2 rounded-full"
              onClick={nextimage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="hidden md:flex h-full w-full overflow-hidden ">
          {desktopImage.map((imageURL, index) => {
            return (
              <div
                className="h-full w-full min-w-full min-h-full transition-all "
                key={imageURL}
                style={{ transform: ` translateX(-${currentImage * 100}%) ` }}
              >
                <img
                  src={imageURL}
                  alt="BannerProduct"
                  className="w-full h-full  "
                />
              </div>
            );
          })}
        </div>

        {/* Mobile  */}
        <div className="flex h-full w-full overflow-hidden md:hidden ">
          {MobileImage.map((imageURL, index) => {
            return (
              <div
                className="h-full w-full min-w-full min-h-full transition-all "
                key={imageURL}
                style={{ transform: ` translateX(-${currentImage * 100}%) ` }}
              >
                <img
                  src={imageURL}
                  alt="BannerProduct"
                  className="w-full h-full object-cover  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
