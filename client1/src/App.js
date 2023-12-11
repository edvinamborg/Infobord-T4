import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
// import defaultImage from "./assets/ballong-liten.svg";
import { useState } from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import Edvin from "./pages/Edvin";
import CompareInfoBord from "./pages/CompareInfoBord";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in";

function App() {
  const [item, setItem] = useState({ item: "Welcome" });
  const getRandomItem = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/collection", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      //priority one is to just be able to get and render item meta data after that,
      // i can make user be able to input all the metadata
      //fetch svg and desciption to
      const collection = await response.json();
      const randomItem =
        collection[Math.floor(Math.random() * collection.length)];
      setItem(randomItem);
    } catch (err) {
      console.error(`Client Err: ${err}`);
    }
  };

  //TODO sanitize all user inputs
  return (
    <div>
      <CompareInfoBord />
    </div>
  );
}

export default App;
