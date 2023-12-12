import React, { useState } from "react";
import DefaultImage from "../assets/DefaultImage";
import PlateImage from "../assets/plateLeft";
import Banana from "../assets/banana";

const CompareInfoBord = ({ image }) => {
	const [leftProduct, setLeftProduct] = useState([]);
	const [rightProduct, setRightProduct] = useState([]);
	const lorem = `ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex xcepteur sint occaecat cupidatat non`;
	const getFruit = async (e) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/collection"
			);
			if (!response.ok) throw new Error("Failed fetching products");

			const products = await response.json();
			const position = e.target.value;

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
		<div className="flex-template">
			<div className="grid-template grid-template-left">
				<div className="left-description">
					<div className="left-description-text">
						<h3>Beskrivning</h3>
						{leftProduct.description
							? leftProduct.description
							: lorem}
						<h4>Utsläpp</h4>
						<h4>Näringsvärden</h4>
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
					</div>
				</div>

				<div className="fruit-left">
					{leftProduct.image ? (
						<img src={leftProduct.image} />
					) : (
						<Banana />
					)}
				</div>
				<div className="balloon-left">
					<DefaultImage />
				</div>
				<div className="rubrik-left">
					<h1>
						{leftProduct.header ? leftProduct.header : "Header"}
					</h1>
				</div>
				<div className="plate-left">
					<div id="pizza">
						<PlateImage />
					</div>
				</div>
				<button
					onClick={getFruit}
					className="btn btn-primary"
					value={"left"}
				>
					Get Fruit
				</button>
			</div>

			<div className="grid-template grid-template-right">
				<div className="right-description">
					<div className="right-description-text">
						<h3>Beskrivning</h3>
						{rightProduct.description
							? rightProduct.description
							: lorem}
						<h4>Utsläpp</h4>
						<h4>Näringsvärden</h4>
					</div>
				</div>

				<div className="fruit-right">
					{rightProduct.image ? (
						<img src={rightProduct.image} />
					) : (
						<Banana />
					)}
				</div>
				<div className="balloon-right">
					<DefaultImage />
				</div>
				<div className="rubrik-right">
					<h1>
						{rightProduct.header ? rightProduct.header : "Header"}
					</h1>
				</div>
				<div className="plate-right">
					<div id="pizza">
						<PlateImage />
					</div>
				</div>
				<button
					onClick={getFruit}
					value={"right"}
					className="btn btn-primary"
				>
					Get Fruit
				</button>
			</div>
		</div>
	);
};

export default CompareInfoBord;
