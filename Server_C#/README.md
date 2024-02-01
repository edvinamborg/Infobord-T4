Backend Documentation
======================
This document contains information regarding the API found here, under 'Server_C#'. This information involves technologies used, tools utilized, packages implemented, and project details. **IMPORTANT:** If you pull the Docker image of this project, you will not be able to change it. The image itself is immutable.

Prerequisites for using this API
----------------------------------
This API depends on a few external prerequisites that should be taken into account if you intend to test it for yourself. I'll list these below. Any code described is located in 'Startup.cs'.
* MongoDB login. The API connects to a cloud-based database in a cluster created using MongoDB. To connect to it using this API, you'll need login details and a connection string. The connection string uses the login details and can be found under 'Connect', under 'Database'.
* Environment variables. The connection string mentioned above can either be hard-coded or extracted using an environment variable, as this API does. For security reasons, I recommend using environment variables for connection strings and similar whenever the code is publicly available. To create an environment variable, search 'edit the system environment variables' (that is, if your system language is set to English) and click 'Environment variables'. You can then add one or several as you wish. This API uses one called 'MONGODB_URI', and it can be found in the `ConfigureServices` method in 'Startup.cs': `string? connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");`. If you pull the Docker image of the API, you'll need to create your own '.env' file and include the connection string there, like you can see in '.env'. You'll want to replace `sample_connection_string` with your actual connection string. The environment variable defined in '.env' is temporarily created while you run a container of the image. **IMPORTANT:** you need to include your custom '.env' file when you run the container. The command for running the command would look like this: `docker run -p 80:80 --env-file your-env-file.env fruit-api-image`.
* Packages. Should you clone this repository and try to use this API, you will get lot of errors under 'Server_C#'. This is because two required packages will be missing initially. To fix this, all you need to do is open your terminal of choice, change directory to 'Server_C#' and run `dotnet restore`. This will restore the packages and fix any errors. More details regarding the two packages in question can be found later in this document, under the header 'Technologies and packages'.
* CORS. If you were to try to use this API through a browser, such as using fetch in JavaScript (this project as a whole implements this usage), you will likely encounter an error. This would be because browsers restrict cross-origin HTTP requests from scripts. In this API, I fixed this problem by adding some code to allow requests from specific locations to be allowed. The following code, found in 'Startup.cs', in the `ConfigureServices` method, shows this:
```csharp
services.AddCors(options => 
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .WithOrigins("http://localhost:5500", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
```
The locations from which cross-origin HTTP requests are allowed are currently http://localhost:5500 and http://localhost:3000. All you need to do to fix the error you might encounter is to add the desired location to the `.WithOrigins` method. To set all locations as acceptable, replace the locations with an asterisk (*), like this: `.WithOrigins(*)`. I would not recommend this outside of development, though. Also, the following code is needed in the `Configure` method to fix the CORS problems: `app.UseCors("CorsPolicy");`.

Initial creation of the project
---------------------------------
This API was created using a simple terminal command: 'dotnet new console'. This creates a very bare bones application that I would not recommend for building an API. I built upon this very simple project to extend its usage, but it was inefficient. Should you, as a reader, want to build your own API, based on this one or not, I would recommend using a template in, for example, Visual Studio 2022. A perfectly fine one is 'ASP.NET Core Web API'. Just be wary of specific settings being different from your desired ones - inspect the result closely before you start working.

Technologies and packages
----------------------------
This API contains two package references: `AttributeRouting.Core.Web` and `MongoDB.EntityFrameworkCore`. 

### AttributeRouting.Core.Web
This is a package used for building modern web applications. It contains features such as routing, dependency injections and a Model-View-Controller architecture. These are very useful for building a web API. With a using directive (`using Microsoft.AspNetCore.Mvc;`), you can, for example, create routes for HTTP GET in a controller class. The package should be included in the project by default if you create it using a template as I suggested earlier. You can find the package reference and its version in the .csproj file. In this API, it looks like this: `<PackageReference Include="AttributeRouting.Core.Web" Version="3.5.6" />`.

### MongoDB.EntityFrameworkCore
This is a package used for integrating Entity Framework Core with MongoDB. In the context of this API, it means that the API uses EF Core to interact with the database, and MongoDB as the backend database. The API uses libraries such as `MongoDB.Driver` and `MongoDB.Bson`. You can install these two separately or `MongoDB.EntityFrameworkCore`, as is the case in this API. The exact usage cases vary slightly, mostly based on how you're interacting with your MongoDB database. You can find the `MongoDB.EntityFrameworkCore` package reference and its version in the .csproj file. In this API, it looks like this: `<PackageReference Include="MongoDB.EntityFrameworkCore" Version="7.0.0-preview.1" />`.

Tools used for building and testing the API
----------------------------------------------
### VSCodium
This is the code editor I used for building the API. Although I recommend Visual Studio 2022 instead for building a .NET web API, you can do it in VSCodium as I did. Do keep in mind that Visual Studio provides better debugging, where you can more easily place breakpoints to manually step through the code and determine where any potential issues may be located. Regardless, should you use VSCodium, there are a few extensions I would recommend at a bare minimum. There are as follow:
1. C#
2. Live Server

Depending on your preferred workspace, I could also recommend 'PowerShell'. Myself, I would rather manually open a PowerShell window outside of VSCodium, but do as you will. As a bonus, if you build a similar API to this one, you'll want to add the 'MongoDB for VS Code' extension as well. This is not applicable if the API you're building does not use a MongoDB database, of course. Keep in mind that these extensions were used only for building the API, you may want some other extensions if you're developing the frontend.

### PowerShell
A terminal, similar to many others. You do not need to use PowerShell, but it is one I can recommend if you have no other terminals in mind. You'll need a terminal to install packages, start the project and so on (specifics vary between VSCodium and Visual Studio).

### Postman
This is the tool I used the most when testing the API. Sending and receiving responses is a lot more lenient with a tool such as Postman, as opposed to using only a browser. It's easy to understand and use, and it's easy to debug. For more specifics on how to use Postman with this project, read 'API_Documentation.md'.

### MongoDB
This is the cloud-based database provider we decided to work with. Learning how to work with it took a little bit, but using it afterwards is easy. If you want to learn how to connect to a MongoDB Atlas Cluster (and by extension, a database), I'd recommend the following link: https://www.mongodb.com/docs/entity-framework/current/quick-start/. If not, or if your project does not require a MongoDB database, you can of course explore other options. If you do work with MongoDB, you may or may not run into some issues with connecting to the database even if your connection string is correct. I ran into this issue, and it's because the port that MongoDB uses is blocked by default. You'll have to find another way around this, the way I did was to create a hotspot from my phone and go through there. Regardless of your approach, keep in mind to add your IP address to the list of allowed IP addresses on the MongoDB database (that is, if you're not already allowing all IP addresses, which is also a valid approach).
