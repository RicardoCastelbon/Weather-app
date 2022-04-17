import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Now-weather.scss";

function NowWeather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const getLocation = () => {
    const urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=516d3b7b3be366abe641fbe25b92bbfc`;
    axios.get(urlLocation).then((res) => {
      setData(res.data);
    });
  };
  const handleChange = (e) => {
    setLocation(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation();
  };
  return (
    <div className="App">
      <h1>WeatherApp</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} />
          <button type="submit">Get Location</button>
        </form>
      </div>
      <div>
        <h1>{data.name}</h1>
        {data.main ? <h1>{Math.floor(data.main.temp - 273.15)}</h1> : null}
      </div>
    </div>
  );
}

export default NowWeather;
