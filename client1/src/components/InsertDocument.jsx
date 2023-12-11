import React, { useState } from "react";

const InsertDocument = () => {
	const [document, setDocument] = useState("");
	const handleAddDocument = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:5000/api/collection/insert",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ document: document }),
				}
			);
		} catch (err) {
			console.error("client: " + err);
		}
	};
	return (
		<div>
			<form
				className="d-flex mt-5"
				onSubmit={handleAddDocument}
			>
				<input
					type="text"
					onChange={(e) => setDocument(e.target.value)}
				/>
				<button
					className="btn btn-success"
					type="submit"
				>
					Add Document
				</button>
			</form>
		</div>
	);
};

export default InsertDocument;
