import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Now-weather.scss";
import { fetchCurrentWeather } from "../api/weather";
import {
  currentLocation,
  getCurrentPositionWeather,
  weatherData,
} from "../api/currentLocation";
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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState();

  const getCurrentWeather = async () => {
    try {
      const res = await currentLocation();
      //
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    currentLocation();
   setData(weatherData);
    console.log(weatherData);
    /*  const weather = currentLocation();
    setData(weather); */
  }, []);
  
  //form functions
  const handleChange = (e) => {
    setLocation(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //getLocation();
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
    if (weatherId == 800) {
      console.log("clear sky");
    } else if (weatherId > 800 && weatherId < 805) {
      console.log("clouds");
    } else if (weatherId > 299 && weatherId < 532) {
      console.log("rain");
    } else if (weatherId > 199 && weatherId < 233) {
      console.log("Thunderstorm");
    }
  };

  useEffect(() => {
    if (data.sys) {
      setSunrise(unix_timeFormatting(data.sys.sunrise));
      setSunset(unix_timeFormatting(data.sys.sunset));
      displayWeatherIcon(data.weather[0].id);
    }

    return () => {};
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
              Weather today in {data.timezone} at 21:00
            </h2>
          </Col>
        </Row>
        <Row className="bg-info rounded">
          <Col className="mt-4">
            <Row>
              {data.current ? (
                <h1 className="text-start">
                  {Math.floor(data.current.temp - 273.15)}°
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
            {data.main ? (
              <FontAwesomeIcon
                icon={faSun}
                className="fa-10x "
                color="#F3D229"
              />
            ) : null}
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
