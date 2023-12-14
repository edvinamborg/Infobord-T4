import React from "react";
import DefaultImage from "../assets/BalloonImage";
import PlateImage from "../assets/plateLeft";

const VisualDiagram = ({ product, position }) => {
  return (
    <>
      <figure className={`balloon-${position} balloon-global`}>
        <DefaultImage />
      </figure>

      <figure className={`plate-${position} plate-global`}>
        <PlateImage />
      </figure>
    </>
  );
};

export default VisualDiagram;
