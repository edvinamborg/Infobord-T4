# Client Documentation

The HTML you see on the website is written in jsx which is React's way of rendering HTML. React is a javascript library As you can see in the Components folder, HTML is made by creating a jsx function where the return value is one HTML tag. Two tags can not exist in the same return statement for an jsx component. If you need more elements there has to be on parent tag that wraps the smaller ones. In the pages folder you will see React components composed from multiple smaller components. We have done this refactoring to more easily maintain the codebase. 

### Libraries
The libraries we used where bootstrap@5.3.2 and React@18.2.0. \n
From the React library you use the useState() function as an easy and safer way of handle the state of variables.
