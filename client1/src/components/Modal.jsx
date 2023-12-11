import React, { useEffect, useState } from "react";

const Modal = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [description, setDescription] = useState("");
	const [header, setHeader] = useState("");

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		try {
			const validSelectedImage =
				selectedImage.includes("svg") || selectedImage.includes("jpeg");

			if (validSelectedImage && description && header) {
				const response = await fetch(
					"http://localhost:5000/api/collection/insert",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							header: header,
							image: selectedImage,
							description: description,
						}),
					}
				);
			} else throw new Error("not valid");
		} catch (err) {
			console.log(err);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		// Read the contents of the selected file and set it as the preview image
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// useEffect(() => {
	// 	console.log(selectedImage);
	// }, [selectedImage]);

	return (
		<div>
			<button
				className="btn btn-info mt-5"
				data-bs-toggle="modal"
				data-bs-target="#modal"
			>
				Open Modal
			</button>

			<div
				className="modal"
				id="modal"
			>
				{" "}
				<div
					className="modal-dialog"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="exampleModalLabel"
							>
								Modal title
							</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form
								className="m-1"
								onSubmit={handleOnSubmit}
							>
								<h6>Available Formats: SVG</h6>
								<input
									type="file"
									name="fileInput"
									id="fileInput"
									onChange={handleFileChange}
								/>
								<p>header</p>
								<input
									type="text"
									name="header"
									id="header"
									onChange={(e) => setHeader(e.target.value)}
								/>
								<p>description</p>
								<textarea
									type="text"
									name="description"
									id="description"
									className="form-control"
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
								<button
									type="submit"
									className="btn btn-primary"
								>
									Save changes
								</button>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
