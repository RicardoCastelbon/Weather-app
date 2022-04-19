import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Now-weather.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudBolt,
  faCloud,
  faCloudRain,
  faSnowflake,
  faWind,
  faTemperatureHalf,
  faDroplet,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

const NowWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  //get weather in place searched
  const getLocation = () => {
    const urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=516d3b7b3be366abe641fbe25b92bbfc`;
    axios.get(urlLocation).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  //get weather in stockholm
  const getWeatherData = () => {
    const urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=516d3b7b3be366abe641fbe25b92bbfc`;
    axios.get(urlLocation).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  //form functions
  const handleChange = (e) => {
    setLocation(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation();
  };

  //Convert unix timestamp to h/m/s
  const unix_timeFormatting = (data) => {
    //let data = data.sys.sunrise;
    let date = new Date(data * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  const displayWeatherIcon = (weatherId) => {
    switch (weatherId) {
      case 800:
        console.log("clear sky");
        break;
      case /[801-804]/:
        console.log("clouds");
        break;
      case "clear sky":
        console.log("rain");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  useEffect(() => {
    if (data.sys) {
      setSunrise(unix_timeFormatting(data.sys.sunrise));
      setSunset(unix_timeFormatting(data.sys.sunset));
    }
    displayWeatherIcon(803);
    return () => {
      console.log("cleanup function");
    };
  });

  return (
    <div className="App">
      <h1>Search a location</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Write a city name"
        />
        <button type="submit">Get Location</button>
      </form>
      <Container className="mt-3">
        <Row className="bg-dark text-white rounded">
          <Col>
            <h2 className="text-start ">
              Weather today in {data.name} at 21:00
            </h2>
          </Col>
        </Row>
        <Row className="bg-info rounded">
          <Col className="mt-4">
            <Row>
              {data.main ? (
                <h1 className="text-start">
                  {Math.floor(data.main.temp - 273.15)}°
                </h1>
              ) : null}
            </Row>
            <Row>
              {data.main ? (
                <p className="text-start">{data.weather[0].description}</p>
              ) : null}
            </Row>
            <Row>
              {data.main ? (
                <p className="text-start">
                  Sunrise {sunrise} / Sunset {sunset}
                </p>
              ) : null}
            </Row>
          </Col>
          <Col className="p-4">
            <FontAwesomeIcon icon={faSun} className="fa-10x " color="#F3D229" />
          </Col>
        </Row>
      </Container>

      <Container className="mt-3 text-start">
        <Row className="">
          <Col className="mt-4">
            <Row>
              <Col>High / Low Temp</Col>
              <Col>
                {data.main ? (
                  <p>
                    {Math.floor(data.main.temp_max - 273.15)}° /
                    {Math.floor(data.main.temp_min - 273.15)}°
                  </p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>Feels like</Col>
              <Col>
                {data.main ? (
                  <p>{Math.floor(data.main.feels_like - 273.15)}°</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>Humidity</Col>
              <Col>{data.main ? <p>{data.main.humidity}%</p> : null}</Col>
            </Row>
            <Row>
              <Col>Pressure</Col>
              <Col>{data.main ? <p>{data.main.pressure} mbar</p> : null}</Col>
            </Row>
          </Col>
          <Col className="mt-4">
            <Row>
              <Col>Visibility</Col>
              <Col>{data.main ? <p>{data.visibility / 1000} km</p> : null}</Col>
            </Row>
            <Row>
              <Col>Wind</Col>
              <Col>{data.main ? <p>{data.wind.speed} m/s</p> : null}</Col>
            </Row>
            <Row>
              <Col>Clouds</Col>
              <Col>{data.main ? <p>{data.clouds.all}%</p> : null}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NowWeather;
