export class DbHandler {
	uri = "http://localhost:5501/api/fruit/";
	getAllProducts = async () => {
		const response = await fetch(this.uri);
		if (!response.ok) throw new Error("Failed to fetch all products");
		return await response.json();
	};
	addItem = async (body) => {
		const response = fetch(this.uri, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) throw new Error("Failed to post to Database");
		return await response.json();
	};
	getProductById = async (id) => {
		const response = await fetch(this.uri + id);
		if (!response.ok) throw new Error("Failed to get product");
		return await response.json();
	};
}
