const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createTokens } = require("./JWTAuth.js");

const uri =
	"mongodb+srv://BiffJonas:InfoBord@clustertest.ufs5xht.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

//all these routes need to be sanitized

const getCollection = async (req, res) => {
	try {
		const data = await client
			.db("test")
			.collection("posts")
			.find({})
			.toArray();
		res.json(data);
	} catch (err) {
		console.error(err);
	}
};

const getDocument = async (req, res) => {
	try {
		const { document } = req.params;
		console.log(document);
		const data = await client
			.db("test")
			.collection("posts")
			.find({ item: document })
			.toArray();
		res.json(data);
	} catch (err) {
		console.error(err);
	}
};

const insertDocument = async (req, res) => {
	try {
		const { header, image, description } = req.body;
		const data = await client.db("test").collection("posts").insertOne({
			header: header,
			image: image,
			description: description,
		});
		res.json(data);
	} catch (err) {
		console.log("Server: Could not insert document ");
	}
};

const deleteDocument = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const data = await client
			.db("test")
			.collection("posts")
			.deleteOne({ _id: new ObjectId(id) });

		if (data.deletedCount === 1) {
			return res
				.status(200)
				.json({ message: "Document sucessfully deleted" });
		} else return res.status(404).json({ message: "Document Not found" });
	} catch (err) {
		console.error(err);
	}
};

//Login post route
// react ska göra en fetch till den från localhost3000/login
//i routen får du en token som ger dig tillkomst till alla andra hemsidor
//försöker du nå en annan hemsida utan valid token skickas du tillbaka till login
//inga routes ska fungera utan token

const loginRoute = async (req, res) => {
	try {
		const { username, password } = req.body;
		const data = await client
			.db("test")
			.collection("user")
			.find({ username: username, password: password })
			.toArray();

		if (!data[0]) {
			console.log("user doesn't exist");
			return res.status(401).json({ message: "user doesn't exist" });
		} else {
			const user = data[0];
			console.log(user);
			console.log("user exists");
			const accessToken = createTokens(user);
			res.cookie("access-token", accessToken, {
				httpOnly: true,
				sameSite: "none",
				maxAge: 1000 * 10,
				secure: true,
				domain: "localhost",
				path: "/",
			});
			res.json("user Logged in");
			console.log("loggedin");
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const registrationRoute = async (req, res) => {
	const { username, password } = req.body;
	const data = await client
		.db("test")
		.collection("user")
		.insertOne({ username: username, password: password });

	console.log(data);
};

module.exports = {
	getCollection,
	getDocument,
	insertDocument,
	deleteDocument,
	loginRoute,
};
