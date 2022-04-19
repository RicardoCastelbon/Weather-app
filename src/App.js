import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NowWeather from "./Now-weather/Now-weather";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <NowWeather />
    </div>
  );
}

export default App;
