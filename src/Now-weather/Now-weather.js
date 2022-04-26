import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Now-weather.scss";
import { fetchCurrentWeather } from "../api/weather";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

//Convert kelvin to farenhait
 export const kelvinToFarenhait = (data) => {
    const farenhait = Math.floor(1.8 * (data - 273.15) + 32);
    return `${farenhait}°F`;
  };
  //Convert kelvin to celsius
  export const kelvinToCelsius = (data) => {
    const celsius = Math.floor(data - 273.15);
    return `${celsius}°C`;
  };
  //convert min/max kelvin to farenhait
  export const minMaxKelvinToFarenhait = (minTemp, maxTemp) => {
    const minFarenhait = Math.floor(1.8 * (minTemp - 273.15) + 32);
    const maxFarenhait = Math.floor(1.8 * (maxTemp - 273.15) + 32);
    return `${minFarenhait}/${maxFarenhait}°F`;
  };
  //convert min/max kelvin to celsius
   export const minMaxKelvinToCelsius = (minTemp, maxTemp) => {
    const minCelsius = Math.floor(minTemp - 273.15);
    const maxCelsius = Math.floor(maxTemp - 273.15);
    return `${minCelsius}/${maxCelsius}°C`;
  };

const NowWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState([]);
  const [toggleDegrees, setToogleDegrees] = useState(true);


  //GET WEATHER IN ACTUAL LOCATION
  async function currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords = `lat=${latitude}&lon=${longitude}`;
        getCurrentPositionWeather(coords);
      });
    } else {
      console.log("User rejected permision");
    }
  }
  async function getCurrentPositionWeather(coords) {
    const urlApi = `https://api.openweathermap.org/data/2.5/onecall?${coords}&exclude=&appid=516d3b7b3be366abe641fbe25b92bbfc`;
    return axios
      .get(urlApi)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    currentLocation();
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
    let formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };
  //Convert unix to day of the week
  const unix_dateFormatting = (data) => {
    //let data = data.sys.sunrise;
    let date = new Date(data * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let formattedDate = days[date.getDay()];
    return formattedDate;
  };
  

  const degreesToogle = () => {
    setToogleDegrees(!toggleDegrees);
  };

  useEffect(() => {
    if (data.current) {
      setSunrise(unix_timeFormatting(data.current.sunrise));
      setSunset(unix_timeFormatting(data.current.sunset));
      //displayWeatherIcon(data.weather[0].id);
    }
    if (data.daily) {
      setHours(data.daily);
      const formated = unix_dateFormatting(data.daily[1].dt);
    }
    return () => {};
  });

  return (
    <div className="App now-weather">
      {/* <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Location" />
        <button className="button" type="submit">
          Search
        </button>
      </form> */}

      <button className="toggleBtn" onClick={degreesToogle}>Celsius/Farenhait</button>

      <Container className="mt-3 text-white">
        <Row>
          <Col>
            <h2 className="location">
              <FontAwesomeIcon icon={faLocationArrow} /> {data.timezone}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="date">{new Date().toDateString()}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {data.current ? (
              <h1 className="temperature">
                {toggleDegrees
                  ? kelvinToCelsius(data.current.temp)
                  : kelvinToFarenhait(data.current.temp)}
              </h1>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {data.current ? (
              <p className="weather-info sky">
                {data.current.weather[0].description}
              </p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {data.current ? (
              <p className="weather-info">
                Sunrise {sunrise} / Sunset {sunset}
              </p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {data.current ? (
              <p className="weather-info">Humidity {data.current.humidity}%</p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {data.current ? (
              <p className="weather-info">Wind {data.current.wind_speed} m/s</p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              {data.daily ? (
                <img
                  className="icon"
                  src={`http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">
                  {toggleDegrees
                    ? minMaxKelvinToCelsius(
                        data.daily[1].temp.max,
                        data.daily[1].temp.min
                      )
                    : minMaxKelvinToFarenhait(
                        data.daily[1].temp.max,
                        data.daily[1].temp.min
                      )}
                </p>
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">{unix_dateFormatting(data.daily[1].dt)}</p>
              ) : null}
            </Row>
          </Col>
          <Col>
            <Row>
              {data.daily ? (
                <img
                  src={`http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">
                  {toggleDegrees
                    ? minMaxKelvinToCelsius(
                        data.daily[2].temp.max,
                        data.daily[2].temp.min
                      )
                    : minMaxKelvinToFarenhait(
                        data.daily[2].temp.max,
                        data.daily[2].temp.min
                      )}
                </p>
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">{unix_dateFormatting(data.daily[2].dt)}</p>
              ) : null}
            </Row>
          </Col>
          <Col>
            <Row>
              {data.daily ? (
                <img
                  src={`http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">
                  {toggleDegrees
                    ? minMaxKelvinToCelsius(
                        data.daily[3].temp.max,
                        data.daily[3].temp.min
                      )
                    : minMaxKelvinToFarenhait(
                        data.daily[3].temp.max,
                        data.daily[3].temp.min
                      )}
                </p>
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">{unix_dateFormatting(data.daily[3].dt)}</p>
              ) : null}
            </Row>
          </Col>
          <Col>
            <Row>
              {data.daily ? (
                <img
                  src={`http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">
                  {toggleDegrees
                    ? minMaxKelvinToCelsius(
                        data.daily[4].temp.max,
                        data.daily[4].temp.min
                      )
                    : minMaxKelvinToFarenhait(
                        data.daily[4].temp.max,
                        data.daily[4].temp.min
                      )}
                </p>
              ) : null}
            </Row>
            <Row>
              {data.daily ? (
                <p className="daily">{unix_dateFormatting(data.daily[4].dt)}</p>
              ) : null}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NowWeather;
