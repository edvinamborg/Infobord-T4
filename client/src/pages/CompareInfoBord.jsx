import React, { useState } from "react";
import DefaultImage from "../assets/BalloonImage";
import PlateImage from "../assets/plateLeft";
import Banana from "../assets/banana";
import ProductDescription from "../components/ProductDescription";
import ProductImage from "../components/ProductImage";
import VisualDiagram from "../components/VisualDiagram";

const CompareInfoBord = ({ image }) => {
  const [leftProduct, setLeftProduct] = useState([]);
  const [rightProduct, setRightProduct] = useState([]);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et";
  const getFruit = async (e) => {
    try {
      const response = await fetch("http://192.168.167.237/api/collection");

      if (!response.ok) throw new Error("Failed fetching products");

      const position = e.target.value;
      const products = await response.json();
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      if (position === "right") {
        setRightProduct(randomProduct);
      } else {
        setLeftProduct(randomProduct);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="grid-template grid-template-left">
        <ProductDescription product={leftProduct} position="left" />

        <ProductImage product={leftProduct} position="left" />

        <VisualDiagram product={leftProduct} position="left" />

        <h1 className="rubrik-left">
          {leftProduct.header ? leftProduct.header : "Header"}
        </h1>

        <button value={"left"} onClick={getFruit} className="btn btn-primary">
          Get Fruit
        </button>
      </div>

      <div className="grid-template grid-template-right">
        <ProductDescription product={rightProduct} position="right" />

        <ProductImage product={rightProduct} position="right" />

        <VisualDiagram product={rightProduct} position="right" />

        <h1 className="rubrik-right rubrik-global">
          {rightProduct.header ? rightProduct.header : "Header"}
        </h1>

        <button value={"right"} onClick={getFruit} className="btn btn-primary">
          Get Fruit
        </button>
      </div>
    </>
  );
};

export default CompareInfoBord;
