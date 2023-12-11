import React from "react";
import DefaultImage from "../assets/DefaultImage";
import PlateImage from "../assets/plateLeft";
import Banana from "../assets/banana";

const CompareInfoBord = ({ image }) => {
  return (
    <div className="flex-template">
      <div className="grid-template grid-template-left">
        <div className="left-description">
          <article className="left-description-text">
            <section>
              <h3>Beskrivning</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </p>
            </section>
            <section>
              <h4>Utsläpp</h4>
              <p>
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex xcepteur sint occaecat cupidatat non
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
        </div>

        <div className="fruit-left">
          <Banana />
        </div>
        <div className="balloon-left">
          <DefaultImage />
        </div>
        <div className="rubrik-left">
          <h1>Banan</h1>
        </div>
        <div className="plate-left">
          <div id="pizza">
            <PlateImage />
          </div>
        </div>
      </div>

      <div className="grid-template grid-template-right">
        <div className="right-description">
          <article className="right-description-text">
            <section>
              <h3>Beskrivning</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </p>
            </section>
            <section>
              <h4>Utsläpp</h4>
              <p>
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex xcepteur sint occaecat cupidatat non
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
        </div>

        <div className="fruit-right">
          <Banana />
        </div>
        <div className="balloon-right">
          <DefaultImage />
        </div>
        <div className="rubrik-right">
          <h1>Äpple</h1>
        </div>
        <div className="plate-right">
          <div id="pizza">
            <PlateImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareInfoBord;
