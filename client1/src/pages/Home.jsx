import React from "react";

const Home = ({ header, imgSource, description }) => {
	return (
		<>
			<h1>{header}</h1>
			<img
				src={imgSource}
				alt="picture"
			/>
			<p>{description}</p>
		</>
	);
};

export default Home;
