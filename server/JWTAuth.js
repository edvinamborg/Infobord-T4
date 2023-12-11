const { sign, verify } = require("jsonwebtoken");

//TODO change this 64 random characters from .env
const secret = "Secret";

const createTokens = (user) => {
	const accessToken = sign(
		{
			username: user.username,
			password: user.password,
		},
		secret
	);
	return accessToken;
};

const validateToken = (req, res, next) => {
	const accessToken = req.cookies["access-token"];
	console.log(accessToken);

	if (!accessToken) {
		return res.status(401).json({ error: "User not Authenticated" });
	}

	try {
		const validToken = verify(accessToken, secret);
		if (!validToken) {
			return res.status(401).json({ error: "Invalid Token" });
		} else {
			req.authenticated = true;
			return next();
		}
	} catch (err) {
		return res.status(400).json({ error: err });
	}
};

module.exports = { createTokens, validateToken };
