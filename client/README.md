# Client Documentation

The HTML you see on the website is written in jsx which is React's way of rendering HTML. React is a javascript library As you can see in the Components folder, HTML is made by creating a jsx function where the return value is one HTML tag. Two tags can not exist in the same return statement for an jsx component. If you need more elements there has to be on parent tag that wraps the smaller ones. In the pages folder you will see React components composed from multiple smaller components. We have done this refactoring to more easily maintain the codebase. 

### Initializing the App
Use the 'cd' command to navigate to the client folder and use the following commands to initialize the app
```bash
npm i
```
```bash
npm start
```

### Creation of the Frontend
The project was created with the command:
```bash
npx create-react-app my-app --template cra-template-pwa
```
Note that React has to be installed globally to use the npx command.

The project has a Index.js that takes the HTML element with the id of root and renders the app component in it. In App.js only the CompareInfoBord component is being rendered. CompareInfoBord is a composite component made from multiple other jsx component as well as a couple lines of jsx html.

### DBHandler
In the ./client/utils you will find a DBhandler javascript class that is used create a connection to the database. All The methods of the class are made to handle the fetch requests to the C# backend API in a safe way. It provides error handleing for all routes of the API if it happens that the fetch attempt fails. Any more routes created in the C# backend should be implemented in DBHandler with the same amount of error handling.

### Libraries
The libraries we used where bootstrap@5.3.2 and React@18.2.0.

From the React library you use the useState() function as an easy and safer way of handle the state of variables.
