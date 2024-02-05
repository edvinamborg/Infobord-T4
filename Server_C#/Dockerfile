# Use the official .NET SDK as a base image for the build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files
COPY *.csproj ./
COPY ./ ./

# Restore dependencies
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app

# Copy the published output from the build image
COPY --from=build-env /app/out .

# Set environment variable during runtime
ENV MONGODB_URI=default_connection_string

# Expose the port the app runs on
EXPOSE 80

# Run the application
CMD ["dotnet", "MongoDB_Test2.dll"]