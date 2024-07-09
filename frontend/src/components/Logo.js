import React from "react";
import Logos from "../assest/logo.png";

const Logo = ({ w, h }) => {
  return (
    <>
      <img src={Logos} alt="img" width={w} height={h} />
    </>
  );
};

export default Logo;
