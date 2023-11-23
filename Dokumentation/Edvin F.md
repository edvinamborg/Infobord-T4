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
