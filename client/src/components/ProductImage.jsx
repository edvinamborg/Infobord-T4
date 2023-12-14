import React from "react";
import Banana from "../assets/banana";

const ProductImage = ({ product, position }) => {
  return (
    <>
      <figure className={`fruit-${position} fruit-global`}>
        {product.image ? <img src={product.image} alt="" /> : <Banana />}
      </figure>
    </>
  );
};

export default ProductImage;
