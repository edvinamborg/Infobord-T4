import React, { useState } from "react";

const DeleteDocument = () => {
	const [documentID, setDocumentID] = useState("");
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:5000/api/collection/${documentID}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<form
				onSubmit={handleDelete}
				className="d-flex mt-5"
			>
				<input
					type="text"
					onChange={(e) => setDocumentID(e.target.value)}
				/>
				<button
					className="btn btn-danger"
					type="submit"
				>
					Delete
				</button>
			</form>
		</div>
	);
};

export default DeleteDocument;
