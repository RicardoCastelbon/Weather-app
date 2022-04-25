import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NowWeather from "./Now-weather/Now-weather";
import Navbar from "./Navbar/Navbar";
import HourlyWeather from "./Hourly-weather/Hourly-weather";
import FiveDayWeather from "./Five-day-weather/Five-day-weather";
import ErrorPage from "./error-page/Error-page";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<NowWeather />} />
        <Route path="/hourly-weather" element={<HourlyWeather />} />
        <Route path="/five-day-weather" element={<FiveDayWeather />} />
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
