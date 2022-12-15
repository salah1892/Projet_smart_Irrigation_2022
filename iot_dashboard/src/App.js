import React from "react";
//import './App.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import AllComponent from "./components/AllComponent";
//import dbConnect from "./db/dbConnect"
function App() {
  // // require database connection 
  // const dbConnect = require("./BackEnd/db/dbConnect");

  // // execute database connection 
  // dbConnect();

 
  return (
    <div className="App">
      
      <Navbar />
      <AllComponent />
      <Footer />
    </div>
  );
}

export default App;