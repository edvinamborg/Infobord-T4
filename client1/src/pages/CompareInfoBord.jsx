import React, { useState } from "react";
import DefaultImage from "../assets/DefaultImage";
import PlateImage from "../assets/plateLeft";
import Banana from "../assets/banana";

const CompareInfoBord = ({ image }) => {
	const [leftProduct, setLeftProduct] = useState([]);
	const [rightProduct, setRightProduct] = useState([]);
	const getFruit = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/collection"
			);

			if (!response.ok) throw new Error("Failed fetching products");
			const products = await response.json();
			const randomLeftProduct =
				products[Math.floor(Math.random() * products.length)];
			console.log(randomLeftProduct);
			setLeftProduct(randomLeftProduct);
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
						{leftProduct.description}
						<h4>Utsläpp</h4>
						ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex xcepteur sint occaecat
						cupidatat non
						<h4>Näringsvärden</h4>
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
					</div>
				</div>

				<div className="fruit-left">
					<img
						src={leftProduct.image}
						alt=""
					/>
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
			</div>

			<div className="grid-template grid-template-right">
				<div className="right-description">
					<div className="right-description-text">
						<h3>Beskrivning</h3>
						{leftProduct.description
							? leftProduct.description
							: `		Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et`}
						<h4>Utsläpp</h4>
						ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex xcepteur sint occaecat
						cupidatat non
						<h4>Näringsvärden</h4>
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
					</div>
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
			<button
				onClick={getFruit}
				className="btn btn-primary"
			>
				Get Fruit
			</button>
		</div>
	);
};

export default CompareInfoBord;
