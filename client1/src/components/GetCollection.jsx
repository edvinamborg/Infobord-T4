import React, { useEffect, useRef, useState } from "react";

const GetCollection = () => {
	const [item, setItem] = useState("");
	const [collection, setCollection] = useState([]);
	const isInitalRender = useRef(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:5000/api/collection",
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					mode: "cors",
				}
			);
			const data = await response.json();
			setCollection(data);
		} catch (err) {
			console.error(`Client Err: ${err}`);
		}
	};

	useEffect(() => {
		if (isInitalRender.current) {
			isInitalRender.current = false;
			return;
		}
		console.log(collection);
	}, [collection]);

	return (
		<div>
			<form
				className="d-flex mt-5"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					value={item}
					onChange={(e) => setItem(e.target.value)}
				/>
				<button
					className="btn btn-primary"
					type="submit"
				>
					Get Collection
				</button>
			</form>
		</div>
	);
};
export default GetCollection;
