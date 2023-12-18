export class DbHandler {
	uri = "http://localhost:5501/api/fruit/";
	getAllProducts = async () => {
		const response = await fetch(this.uri);
		if (!response.ok) throw new Error("Failed to fetch all products");
		return await response.json();
	};
	addProduct = async (body) => {
		const response = fetch(this.uri, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) throw new Error("Failed to post to Database");
		return await response.json();
	};
	getProductById = async (objectId) => {
		const response = await fetch(this.uri + objectId);
		if (!response.ok) throw new Error("Failed to get product");
		return await response.json();
	};
	updateProduct = async (objectId, body) => {
		const response = await fetch(this.url + objectId, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) throw new Error("Failed to update product");
		return await response.json;
	};
	deleteProduct = async (objectId) => {
		const response = await fetch(this.url + objectId, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) throw new Error("Failed to delete product");
		return await response.json();
	};
}
