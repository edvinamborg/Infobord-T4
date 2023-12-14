import React from "react";

const ProductDescription = (product, position) => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et";
  return (
    <>
      <article className={`${position}-description`}>
        <section>
          <h3>Beskrivning</h3>
          {product.description ? product.description : lorem}
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
    </>
  );
};

export default ProductDescription;
