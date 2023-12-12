Måndag 20 November
-----------------------
I continued working on learning web APIs in C#. I'm following a few different Microsoft tutorials on the subject, as listed below:
* https://learn.microsoft.com/en-us/training/modules/build-web-api-aspnet-core/3-exercise-create-web-api
* https://learn.microsoft.com/en-us/shows/beginners-series-to-web-apis/creating-a-web-api-project-3-of-18--beginners-series-to-web-apis
* https://learn.microsoft.com/sv-se/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-8.0
* https://learn.microsoft.com/sv-se/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&preserve-view=true&tabs=visual-studio

I shall proceed in these courses/tutorials as well as watching related videos and reading articles to learn as much as possible.

2023-11-22
-----------------
I've continued to work with APIs in C#, and have made some progress. I went through this entire couse: https://learn.microsoft.com/en-us/training/modules/build-web-api-aspnet-core/1-introduction, and have started with this course as well: https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core/4-interacting-data. The latter introduces subjects related to connecting a self-made API to databases that save content in a separate database rather than in-memory, which should be useful in the future. I had a little trouble with installing some packets through PowerShell, since the project requires the .NET version 7 framework rather than version 8, as is the most recent. When trying to install the packets, I got an error message saying that the packets were incompatible with the .NET version. Since the most recent version was automatically chosen, I was unintentionally trying to install packets of .NET version 8. With this link https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-dotnet-cli, I found information about how to specify the version required, which got me the right packets. I'll continue with the course tomorrow, since it's proven rather insightful so far.

2023-11-23
----------------
After completing the tutorial I mentioned above, I continued with more of the same kind. I've started prioritizing tutorial projects related to Entity Framework Core, as it seems like a technology that could be very useful in this project. It allows me to connect a .NET API to an external database service, such as MongoDB. I went through this entire course today: https://learn.microsoft.com/en-us/training/modules/build-web-api-minimal-database, and started on this one: https://learn.microsoft.com/en-us/training/modules/secure-aspnet-core-identity/. However, the SQL database doesn't register changes made in the project. It seems that the problem has to do with an extension that the project requires, https://github.com/Microsoft/vscode-mssql.git. After downloading the extension, I can't seem to use its funcitons. When I attempted to connect to the SQL server, I got a message stating "command mssql.connect not found". I tried uninstalling and reinstalling the extension in two ways, while also reloading VSCodium. It had no effect, unfortunately, so I'll continue trying to fix it tomorrow.

2023-11-30
--------------
For the past few days, I've been working on setting up a small API that connects to a MongoDB database and prints out some data that is extracted from the database. The project I've been following can be found here: https://www.mongodb.com/docs/entity-framework/current/quick-start/. It's a small project, but it seems to teach exactly what is needed for this project. I had a little trouble setting up an environment variable, but I eventually opted for entering it manually through Windows settings rather than trying to generate it through a CLI. This worked. I then ran into the issue of not being able to connect to the MongoDB database. I got a rather massive error message, that basically just said "timed out". I had received intel from a group member, Johannes, that this would happen, so no surprise. All I had to do was change network to a hotspot on my phone or try it from home. However, this did not work. I kept getting the same "time out" message, and I was unsure of what was wrong. I think it took me in total about half an hour to figure out that the reason why it wasn't working is because only one IP address was whitelisted in my cluster on MongoDB; the IP address that this computer has on the school's network. All I had to do was connect to my phone's hotspot, add that IP address to the cluster's list of whitelisted IP addresses, and now I know the plot of Back to the Future (a message that tells the plot of the movie in question is extracted from the database and written out in the console, to show a successful connect). I used the following links when working:
* https://cloud.mongodb.com/
* https://www.mongodb.com/docs/guides/crud/install/
* https://www.mongodb.com/docs/drivers/csharp/current/
* https://www.mongodb.com/docs/drivers/csharp/current/quick-start/#std-label-csharp-quickstart
* https://stackoverflow.com/questions/76603019/the-term-export-is-not-being-recognized
* https://stackoverflow.com/questions/52885919/c-sharp-predefined-type-system-object-is-not-defined-or-imported
* https://learn.microsoft.com/en-us/dotnet/core/tools/sdk-errors/netsdk1045
* https://stackoverflow.com/questions/31314245/a-timeout-occured-after-30000ms-selecting-a-server-using-compositeserverselector
* https://stackoverflow.com/questions/55573811/a-timeout-occured-after-30000ms-selecting-a-server-while-accessing-mongodb-in-az
* https://www.mongodb.com/community/forums/t/timeout-when-selecting-a-server-after-inactivity/147978/2
* https://www.mongodb.com/docs/atlas/troubleshoot-connection/

2023-12-04
-------------
As practice, I decided to redo the project above but with less instructions from a tutorial. To make it as similar to the final result of this project as possible, I started by adding another database to my cluster on MongoDB with a document containing sample data of a banana. I then created a new dotnet console application, set up a MongoClient, fixed the connection string (it's a local environment variable, so I merely needed to access it) and set up the connection to the database. It all took far longer than it should have since I ran into an ungodly amount of problems with basically everything. Anyhow, it worked in the end. I can retrieve data regarding fruits from a MongoDB database through a .NET project using a self-made API. I think this is what I'm supposed to create in the end, so this should be a step in the right direction. I also separated the classes into different files and folders, to make it more concise and clear. The project consists of a .csproj file, a Program.cs file, a Fruit.cs file and a FruitContext.cs file. Fruit.cs defines what data one can retrieve from the database, and FruitContext.cs more or less copies the database that is specified when the class is instantiated with an argument. There's also a global.json file, but all it does is define which SDK version to use (MongoDB seems to require version 7, despite SDK version 8 being the most recent).

2023-12-11
-------------
This second project now looks more or less like I imagine the final API will look like. One can retrieve data from the database in the cluster in MongoDB, using HTTP GET with or without an ObjectId (with id to get a single object, without id to get all of them). One can also remove data using `[HttpDelete("{id}")]` or add data using HTTP POST. All of this can be done using a regular browser like Firefox, an API platform like Postman or the fetch method in JavaScript. I had a little trouble with CORS requests failing when I was trying to use fetch, but I eventually got that fixed by adding some CORS related code to "Startup.cs". Now, from what I can tell, all that remains to add is the HTTP PUT method so that users can update objects in the database.
