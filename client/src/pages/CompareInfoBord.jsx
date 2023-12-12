import React, { useState } from "react";
import DefaultImage from "../assets/DefaultImage";
import PlateImage from "../assets/plateLeft";
import Banana from "../assets/banana";

const CompareInfoBord = ({ image }) => {
  const [leftProduct, setLeftProduct] = useState([]);
  const [rightProduct, setRightProduct] = useState([]);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et";
  const getFruit = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/api/collection");

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
        <article className="left-description">
          <section>
            <h3>Beskrivning</h3>
            {leftProduct.description ? leftProduct.description : lorem}
          </section>
          <section>
            <h4>Utsläpp</h4>
            <p>
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex xcepteur sint occaecat cupidatat non
            </p>
          </section>
          <section>
            <h4>Näringsvärden</h4>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>
        </article>

        <figure className="fruit-left fruit-global">
          <img src={leftProduct.image} alt="" />
        </figure>

        <figure className="balloon-left balloon-global">
          <DefaultImage />
        </figure>

        <h1 className="rubrik-left">
          {leftProduct.header ? leftProduct.header : "Header"}
        </h1>

        <figure className="plate-left plate-global">
          <PlateImage />
        </figure>
        <button value={"left"} onClick={getFruit} className="btn btn-primary">
          Get Fruit
        </button>
      </div>

      <div className="grid-template grid-template-right">
        <article className="right-description">
          <section>
            <h3>Beskrivning</h3>
            {rightProduct.description ? rightProduct.description : lorem}
          </section>
          <section>
            <h4>Utsläpp</h4>
            <p>
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex xcepteur sint occaecat cupidatat non
            </p>
          </section>
          <section>
            <h4>Näringsvärden</h4>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>
        </article>

        <figure className="fruit-right fruit-global">
          {rightProduct.image ? <img src={rightProduct.image} /> : <Banana />}
        </figure>

        <figure className="balloon-right balloon-global">
          <DefaultImage />
        </figure>

        <div className="rubrik-right rubrik-global">
          <h1>{rightProduct.header ? rightProduct.header : "Header"}</h1>
        </div>

        <figure className="plate-right plate-global">
          <PlateImage />
        </figure>
        <button value={"right"} onClick={getFruit} className="btn btn-primary">
          Get Fruit
        </button>
      </div>
    </>
  );
};

export default CompareInfoBord;
