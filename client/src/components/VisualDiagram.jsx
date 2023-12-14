import React from "react";

const VisualDiagram = ({ product, position }) => {
	return (
		<>
			<figure className="balloon-right balloon-global">
				<BalloonImage />
			</figure>

			<div className="rubrik-right rubrik-global">
				<h1>{rightProduct.header ? rightProduct.header : "Header"}</h1>
			</div>

			<figure className="plate-right plate-global">
				<PlateImage />
			</figure>
		</>
	);
};

export default VisualDiagram;
