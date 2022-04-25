import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NowWeather from "./Now-weather/Now-weather";
import Navbar from "./Navbar/Navbar";
import HourlyWeather from "./Hourly-weather/Hourly-weather";
import FiveDayWeather from "./Five-day-weather/Five-day-weather";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      {/* <NowWeather /> */}
      {/* <HourlyWeather/>  */}
      <FiveDayWeather/>
    </React.Fragment>
  );
}

export default App;
