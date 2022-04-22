import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NowWeather from "./Now-weather/Now-weather";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <NowWeather />
    </React.Fragment>
  );
}

export default App;
