import React from "react";
import CategoryList from "../components/categoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCartProduct from "../components/VerticalCartProduct";
const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />
      <VerticalCartProduct category={"mobiles"} heading={"Top's Mobiles"} />
      <VerticalCartProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCartProduct
        category={"televisions"}
        heading={"See Beyond the Screen with Our Televisions"}
      />
      <VerticalCartProduct
        category={"camera"}
        heading={"Capture Your Story Through Our Camera"}
      />
      <VerticalCartProduct category={"earphones"} heading={"Earphones"} />
      <VerticalCartProduct category={"speakers"} heading={"Speakers"} />
      <VerticalCartProduct
        category={"refigerator"}
        heading={"Innovative Refrigeration, Everyday Ease"}
      />
      <VerticalCartProduct
        category={"trimmers"}
        heading={"Trim with Precision."}
      />
      <VerticalCartProduct
        category={"printers"}
        heading={"Print Smarter, Print Better"}
      />
    </div>
  );
};

export default Home;
