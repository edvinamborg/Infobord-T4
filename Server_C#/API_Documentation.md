API Documentation
=====================
Here you will find information regarding the usage of the current API. Any mention of the 'project root' refers to the project root of the API; the folder 'Server_C#'. For information regarding prerequisites and important information for using this API, see 'README.md'.

### How to test the API
1. Start the API. You can accomplish this by running `dotnet run` in the project root using a terminal such as PowerShell.
2. Take note of the port that the API uses, as of right now it should be 5501. The port number can be manipulated in Program.cs. For more details, go to 'How to change port number used by the API'.
3. Use a tool such as Postman, HttpRepl or a web browser to send HTTP methods to the URL documented in the terminal after running the command above. The current HTTP methods implemented are GET (with or without ObjectId), POST, PUT, and DELETE. The latter two both require an ObjectId. An ObjectId that refers to an item can be found in the database on MongoDB. If the status message returned is 2xx, the method was successful. If not, check your method for any errors. These may include sending an incorrect JSON body for PUT or POST requests, or inputting an ObjectId that is not found in the Database.

### How to change port number used by the API
1. Go to 'Program.cs' in the project root of the API.
2. Locate the following code: `webBuilder.UseUrls("http://example:XXX");` in 'Program.cs'.
3. Replace `XXX` with the desired port number. Upon starting the API, it will use the provided port number. Make sure to use a unique port number to avoid errors.

### How to set the connection string
1. Locate 'Startup.cs' in the project root of the API.
2. Locate the following code: `string? connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");`. Currently, the API uses the connection string specified in an environment variable called 'MONGODB_URI'. This is for security reasons. If you have not set the connection string as an environment variable, the API will not be able to access the database. You can set the connection string manually by replacing `Environment.GetEnvironmentVariable("MONGODB_URI")` with a static URI, but please only do so during development.
3. If you need to find the connection string to the cluster on MongoDB, start by finding the cluster in question on MongoDB, click Connect, choose Drivers, choose C#/.NET as the driver, and locate the connection string. Remember to replace <password> with the password of the user account on MongoDB.
4. If you update the environment variable, remember to restart your code editor. Otherwise, it will not read the updated value of the environment variable.

### How to specify the database to target
1. Go to 'Startup.cs' in the project root of the API.
2. Locate the following code: `services.AddScoped<FruitContext>(provider => FruitContext.Create(provider.GetRequiredService<IMongoClient>().GetDatabase("test")));`.
3. Replace `"test"` with the desired database to target.

### How to specify the collection to target in the database
1. Go to 'FruitContext.cs' in the project root of the API.
2. Locate the following code: `modelBuilder.Entity<Fruit>().ToCollection("posts");`.
3. Replace `"posts"` with the desired collection to target.

### How to specify the values to be returned from the database
1. Go to 'Fruit.cs' in the folder Models under the project root of the API.
2. Add, remove or replace any of the data types and the variable names of the values with your desired value along with a data type. Required values should be marked with `[Required(ErrorMessage = "X is required")]` above them, where "X" is the name of the variable.

### How to specify external URLs that can access the API using cross-origin requests
1. Go to 'Startup.cs' in the project root of the API.
2. Locate the following code:
```csharp
services.AddCors(options => 
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .WithOrigins("http://example:XXX", "http://example:XXX")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
```
4. Replace `http://example` following `.WithOrigins` with the desired URL. Replace XXX with the port number used. You can also add more URLs by adding a comma in between, as seen in the example. 

API usage examples
=====================

### HTTP GET (all items). This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method GET.
3. In the search bar, input the URL specified in the console. In my case, it's `http://localhost:5501/api/fruit`, and press send. JSON data containing all the existing fruits and the data that they contain should be returned, along with a 200 OK status message.

### HTTP GET (all items). This example uses a browser (Firefox in this case).
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open a browser of your choice. In the search bar, go to the URL specified in the console. In my case, it's `http://localhost:5501/api/fruit`.

### HTTP GET (single item). This example uses a browser (Firefox in this case).
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open a browser of your choice. In the search bar, go to the URL specified in the console, and append the ObjectId of the desired fruit to the URL. For example, if the ObjectId is `42189`, the URL would be `http://localhost:5501/api/fruit/42189`. Note that this ObjectId is a mere sample - it does not exist in the database.

### HTTP POST. This example uses Postman. 
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method POST.
3. Under Headers, add a key 'Content-Type'. As its value, add 'application/json'. This allows you to send a JSON body with the request, and it will contain the key/value pairs.
4. Under Body, add some JSON code. For example:
```json
{
    "header":"Apple",
    "description":"Sample_description_of_apple",
    "image": "sample_sample_image_string"
}
```
These key/value pairs are dependent on the variables found in Fruit.cs under the folder Model under the project root, so make sure you know what data to send with the request. Otherwise, you will receive an error status message as the three above are all mandatory.
6. Type in the URL and port number of the API. This is documented in the console after running `dotnet run`. In my case, it's: `http://localhost:5501/api/fruit/`.
7. Press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, check your request to make sure that your JSON is valid and that you completed step 3.

### HTTP PUT. This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request, and select the method PUT.
3. Type in the URL and port number of the API. This is documented in the console after running `dotnet run`. In my case, it's: `http://localhost:5501/api/fruit/[ObjectId]`. Replace [ObjectId] with the ObjectId of the item you want to target.
4. Under Headers, add a key 'Content-Type'. As its value, add 'application/json'. This allows you to send a JSON body with the request, and it will contain the key/value pairs.
5. Under Body, add some JSON code. For example:
```json
{
    "header":"Apple",
    "description":"Sample_description_of_apple",
    "image": "sample_sample_image_string"
}
```
These key/value pairs are dependent on the variables found in Fruit.cs under the folder Model under the project root, so make sure you know what data to send with the request. Otherwise, you will receive an error status message as the three above are all mandatory.
7. Type `http://localhost:5501/api/fruit/`, and press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, check your request to make sure that your JSON is valid and that you completed step 4. The request will also fail if no object with the specified ObjectId exists. Also keep in mind that PUT updates the entire item. Even if you only want to change one value, you have to enter all of them into the JSON body - even if some of them are the same as before.

### HTTP DELETE. This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method DELETE.
3. Type `http://localhost:5501/api/fruit/[ObjectId]`. Replace [ObjectId] with the ObjectId of the item you want to target. Press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, it is likely that no item with the specified ObjectId exists.
