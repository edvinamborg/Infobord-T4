import React, { useState } from "react";

const Login = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/login", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					username: username,
					password: password,
				}),
				credentials: "include",
				mode: "cors",
			});
			// if (accessToken) {
			// 	// Do something with the token if needed
			// 	console.log("Received access token:", accessToken);
			// } else {
			// 	console.log(document.cookie);
			// }
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<h1>Login</h1>
			<form
				className="d-flex mt-5"
				onSubmit={handleOnSubmit}
			>
				<input
					type="text"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="btn btn-success"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
