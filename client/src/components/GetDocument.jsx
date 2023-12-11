import React, { useState } from "react";

const GetDocument = () => {
	const [document, setDocument] = useState("");
	const handleGetDocument = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:5000/api/collection/${document}`
			);
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<form
				className="d-flex mt-5"
				onSubmit={handleGetDocument}
			>
				<input
					type="text"
					value={document}
					onChange={(e) => setDocument(e.target.value)}
				/>
				<button
					className="btn btn-warning"
					type="submit"
				>
					Get Document
				</button>
			</form>
		</div>
	);
};

export default GetDocument;
