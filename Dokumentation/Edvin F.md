Journal
=========

2023-11-20
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

2023-12-13
------------
The HTTP PUT method has now been implemented. Similar to HTTP DELETE, HTTP PUT can only be used with an ObjectId that targets a specific document in the database. This means that one can't send an HTTP DELETE or HTTP PUT targeting the entire database, so one can't delete the entire thing all that easily (I think). I also added some `[Required(ErrorMessage = "X is required")]` to the variables in the Fruit model class, meaning any HTTP PUT method sent will be unsuccessful unless name, description and image_string are included in the body of the request. This prevents the aforementioned from being set to null if the request is incomplete.

2023-12-14
--------------
During the first lesson, I pushed the API I've been working on to this project on GitHub (at the time of writing, it's located under "Server_C#"). Although I intended for it to be a test project, I suppose it's good that it comes to use. After all, it does work. After a bit of tinkering, the API is functional in the whole project, so the React application can use fetch to get data about the fruits from the database on MongoDB using this API. Functional as it may be, I believe there is absolutely room for improvement. So, I'm thinking of continuing learning about APIs in C# and perhaps making a new, improved one, to replace the current one in the future. Anyhow, during the second lesson, I wrote a README.md file for "Server_C#" that contains documentation regarding the usage of the API. I tried to write the documentation so that anyone wanting to use the API (it's not exactly a public API, though) can use it, and I think it came out adequate. In hindsight, I'm now realizing that since this repository is public, meaning anyone can access it, storing the connection string to the MongoDB cluster as a static string in the code would mean giving everyone free access to said cluster. Good thing the connection string is stored in an environment variable, I suppose...

2023-12-15
-------------
I spent the lesson learning some more about Git. I'm mostly documenting this because I need to make sure I know how to fetch changes from this repository and merge them into the fork I made, since I'm mainly learning how forks work. At the time of writing, I've made a fork that is identical to this repository, and I've cloned it to a local folder. After I commit this update to "Edvin F.md", I shall try fetching and merging the change into my local repository and see what happens. Then, I'll create a new branch, update the README.md file, and commit the changes. If all goes well, I'll push the changes to the new branch of the fork and submit a pull request.

The pull request worked and looks good, I think? From what I can tell, the only changes in the pull request that would be relevant for this repository are the changes I made to the README.md file in the project root, which is what I was hoping for. I did, as I wrote above, commit to this repository after forking it to see what would happen, and fetching and merging the changes seems to have worked perfectly. I'll wait for the others to see the pull request, and let them accept or decline my changes.

2023-12-19
-------------
Since I submitted my pull request, some commits were made, changing the README.md file. This meant that the pull request caused a merge conflict. Johannes approved the pull request though, so all I had to do was fix the conflict and merge the commits. It was a relatively simple process that was surprisingly fun for what it was, and I learned from it. So, I started by running `git fetch upstream`, and then `git merge upstream/main`. This fetched all changes that had been made to this repository since I last fetched them, including the ones to the README.md file, and integrated them into my local fork of the project. This, as expected, also caused a merge conflict. I then solved it by manually editing the file to contain the contents of both commits. I then committed these changes to my fork on GitHub, and just like that, no more merge conflict. I could safely merge the commits into the final README.md file.

After the pull request was closed, the branch on which I made the changes to the README.md file was no longer necessary (the branch was of the fork, not of this repository). I had a little trouble deleting this branch, since it was not deleted after I deleted the branch locally and pushed the changes to the fork. I did get it deleted by removing it through GitHub, but then it was still (sort of) present locally. Running `git branch -a` still showed the branch as being present on GitHub - I hadn't fetched any changes (such as removing the branch on GitHub), so my local repository was kind of outdated, or something of the like. Anyhow I also ran `git fetch --prune`, which fixed the issue. The branch now is no more, locally and not.

2023-12-23
--------------
During the holiday, I'll try to learn more about APIs and related subjects. I've another unrelated project in the works that will implement an API, but with an SQL database instead of a MongoDB one. After the holiday, I'll see if I can redo the current API and make it better, with additional security measures and what not.

2023-12-24
------------
I've run into an issue when trying to implement usage of the database context. When trying to use the context to get some items from the SQL database, I'm getting an error message stating 'only the invariant culture is supported in globalization-invariant mode'. I think I sort of know what causes the issue, but it's been somewhat of a hassle to debug. Anyhow, the other parts of the API are coming along nicely, so there's that. I'll see if I can get it fixed tomorrow, with this day being a little more 'eventful' than some others...

2024-01-15
------------
Any problems I ran into earlier were fixed some time ago. Now, I've updated the current API in this project as well. I decided not to completely redo it as I saw no reason to - it works as is and I merely needed to change a few things. I made these changes on a new branch of my fork of this repository, and I then opened a pull request and merged the branches. As far as I know, it all went well.

2024-01-18
-----------
During the previous lesson (2024-01-16), I was working on the backend documentation, the new README.md file (I renamed the previous one to 'API_Documentation', since it only contains information regarding the usage of the API). I finished the document today. It contains information that anyone visiting the repository may find interesting, such as tools used (come to think of it, I think there's already a section for that in 'API_Documentation', so I may want to fix that), VSCodium extensions needed and some other things.

Update: there was no section for that in 'API_Documentation'. Also, the Server_C#/README.md document contains information about prerequisites, packages implemented and so on. A little more than I mentioned above, in other words.

2024-01-29
-----------
I've implemented MediatR usage into the API now. This means that the API uses less dependencies and is easier to debug/test. All around improvements, I should think. Also, I changed the code related to the launch of the program. Now, it doesn't listen on localhost, but rather just an IP address. More specifically, the Wi-Fi IP address of the device that runs the code. This means that devices other than only the one that runs the program can now use the API, such as another computer or a phone. I also changed the .gitignore file and moved it to the project root so that, for example, .vs/ doesn't appear on GitHub. I *think* the API is done now, as of right now I do not know what I could add that would bring something of use. I think both README.md and API_Documentation.md contain sufficient information, as well.

2024-02-05
-----------
Since tuesday last week, I've been working on containerizing the backend. It was a long and mostly fun process. Then I came to the problem of passing a custom environment variable to the container - the connection string cannot be set before creating the Docker image, otherwise it will be visible here on GitHub. I struggled for a long time with getting this fixed, but I often arrived at the same problem. This being that the container didn't read the provided environment variable, leading to it being unable to access the MongoDB database. I tried to do this using sample and user provided '.env' file, but no matter as it didn't work. Eventually I got it working by setting the environment variable in the Dockerfile (which, as of the time of writing, is not visible in this repository because of some Netlify checks failing or something) like this: `ENV MONGODB_URI=default_connection_string`. I then replaced the value with a proper one when running the container, like this: `docker run -e MONGODB_URI='actual_connection_string' -p 8080:80 fruit-api-image`. And no, that is not the actual connection string. So this did work, the connection string got the correct value. Then for the actual problem: The API uses the currently configured Wi-Fi IP address of the device on which it runs. And because the container runs in an isolated environment, no Wi-Fi IP address is found. And so the API tries to listen on 'http://', which doesn't work. It throws an error and the container is sad. Maybe there's a way to fix this, I do not yet know. And I lack the time necessary to fix it, so I see no other option than to abandon the dockerization of the backend for now.
