const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./JWTAuth.js");

const {
	getCollection,
	insertDocument,
	deleteDocument,
	getDocument,
	loginRoute,
} = require("./Routes");

const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//TODO JWT authentication middleware

//ROUTES//

//Login for JWT Token

app.post(`/login`, loginRoute);

//get collection
app.get(`/api/collection`, getCollection);

//Get document
app.get(`/api/collection/:document`, getDocument);

//Insert document in collection
app.post(`/api/collection/insert`, insertDocument);

//delete document
app.delete(`/api/collection/:id`, deleteDocument);

//Update document

app.listen(PORT, () => {
	console.log(`listen on port: ${PORT}`);
});

//
