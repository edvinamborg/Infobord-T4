API Documentation
=====================
Here you will find information regarding the usage of the current API. Any mention of the 'project root' refers to the project root of the API; the folder 'Server_C#'.

### How to test the API
1. Start the API. You can accomplish this by running `dotnet run` in the project root using a terminal such as PowerShell.
2. The API will use the Wi-Fi IP address of current device. The link which you can use to test the API will be documented in the terminal upon successfully running it. It will look similar to `http://XXX.XXX.XXX.XXX:80`. `XXX.XXX.XXX.XXX` represents the IP address. Take note of the port that the API uses, in this case 80. The port number can be manipulated in Program.cs. For more details, go to 'How to change port number used by the API'.
3. Use a tool such as Postman, HttpRepl or a web browser to send HTTP methods to the URL documented in the terminal after running the command above. The current HTTP methods implemented are GET (with or without ObjectId), POST, PUT, and DELETE. The latter two both require an ObjectId. An ObjectId that refers to an item can be found in the database on MongoDB. If the status message returned is 2xx, the method was successful. If not, check your method for any errors. These may include sending an incorrect JSON body for PUT or POST requests, or inputting an ObjectId that is not found in the Database.

### How to test the API after pulling the Docker image
1. First, you'll need to pull the image that you will use. You can accomplish this with `docker pull api-fruit-image`.
2. Create your own '.env' file. It can be called 'custom.env', for example. Copy the contents of this project's '.env' file, and paste them in your '.env' file. Then, replace the sample connection string with the actual connection string.
3. When running the container based on the image, remember to include your custom '.env' file: `docker run -p 80:80 --env-file custom.env fruit-api-image`.
4. See step 3 of 'How to test the API', above.

### How to change port number used by the API
1. Go to 'Program.cs' in the project root of the API.
2. Locate the following code: `webBuilder.UseUrls($"http://{ipAddress}");` in 'Program.cs'.
3. Add `:XXX` after `{ipAddress}` with the desired port number. Upon starting the API, it will use the provided port number. Should no port number be specified, as is currently the case, port number 80 will be used.

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
3. Replace "example" with the desired collection to target.

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
4. Replace `"http://example"` following `.WithOrigins` with the desired URL. Replace XXX with the port number used. You can also add more URLs by adding a comma in between, as seen in the example. 

API usage examples
=====================

### HTTP GET. This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method GET.
3. Type `http://XXX.XXX.XXX.XXX/api/fruit/`, and press send. JSON data containing all the existing fruits and the data that they contain should be returned, along with a 200 OK status message.

### HTTP GET. This example uses a browser (Firefox in this case).
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. In the browser, go to the URL specified in the console. In my case, it's `http://XXX.XXX.XXX.XXX/api/fruit/`, where `XXX.XXX.XXX.XXX` represents a Wi-Fi IP address.

### HTTP POST. This example uses Postman. 
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method POST.
3. Under Headers, add a key 'Content-Type'. As its value, add 'application/json'. This allows you to send a JSON body with the request, and it will contain the key/value pairs.
4. Under Body, add some JSON code. For example:
```json
{
    "name":"Simple fruit",
    "description":"Sample_descriptioner_again",
    "image_string": "sample_image_string"
}
```
These key/value pairs are dependent on the variables found in Fruit.cs under the folder Model under the project root, so make sure you know what data to send with the request. Otherwise, you will likely receive an error status message.
6. Type in the URL and port number of the API. This is documented in the console after running `dotnet run`. In my case, it's `http://XXX.XXX.XXX.XXX/api/fruit/`, where `XXX.XXX.XXX.XXX` represents a Wi-Fi IP address.
7. Press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, check your request to make sure that your JSON is valid and that you completed step 3.

### HTTP PUT. This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request, and select the method PUT.
3. Type in the URL and port number of the API. This is documented in the console after running `dotnet run`. In my case, it's `http://XXX.XXX.XXX.XXX/api/fruit/`, where `XXX.XXX.XXX.XXX` represents a Wi-Fi IP address. Replace [ObjectId] with the ObjectId of the item you want to target.
4. Under Headers, add a key 'Content-Type'. As its value, add 'application/json'. This allows you to send a JSON body with the request, and it will contain the key/value pairs.
5. Under Body, add some JSON code. For example:
```json
{
    "name":"Simple fruit",
    "description":"Sample_descriptioner_again",
    "image_string": "sample_image_string"
}
```
These key/value pairs are dependent on the variables found in Fruit.cs under the folder Model under the project root, so make sure you know what data to send with the request. Otherwise, you will likely receive an error status message.
7. Type `http://XXX.XXX.XXX.XXX/api/fruit/`, where `XXX.XXX.XXX.XXX` represents a WiFi-IP address, and press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, check your request to make sure that your JSON is valid and that you completed step 4. The request will also fail if no object with the specified ObjectId exists. Also keep in mind that PUT updates the entire item. Even if you only want to change one value, you have to enter all of them into the JSON body - even if some of them are the same as before.

### HTTP DELETE. This example uses Postman.
1. Run `dotnet run` in a terminal such as PowerShell in the project root of the API.
2. Open Postman, choose new request and select the method DELETE.
3. Type `http://XXX.XXX.XXX.XXX/api/fruit/`, where `XXX.XXX.XXX.XXX` represents a WiFi-IP address. Replace [ObjectId] with the ObjectId of the item you want to target. Press send. If the request is successful, you should receive a '204 No Content' status message. If the request fails, it is likely that no item with the specified ObjectId exists.