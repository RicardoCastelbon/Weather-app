import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NowWeather from "./NowWeather/NowWeather";
import Navbar from "./Navbar/Navbar";
import HourlyWeather from "./HourlyWeather/HourlyWeather";
import FiveDayWeather from "./FiveDayWeather/FiveDayWeather";
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
