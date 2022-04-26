import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Five-day-weather.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import {
  kelvinToCelsius,
  kelvinToFarenhait,
  minMaxKelvinToFarenhait,
  minMaxKelvinToCelsius,
} from "../Now-weather/Now-weather";

const FiveDayWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [date, setDate] = useState("");
  const [days, setDays] = useState([]);
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
  //Convert unix to day
  const unix_dayFormating = (data) => {
    let date = new Date(data * 1000);
    let day = date.getDate();
    return day;
  };

  useEffect(() => {
    if (data.current) {
      setSunrise(unix_timeFormatting(data.current.sunrise));
      setSunset(unix_timeFormatting(data.current.sunset));
      //displayWeatherIcon(data.weather[0].id);
    }
    if (data.daily) {
      setDays(data.daily);
      const formated = unix_dateFormatting(data.daily[1].dt);
    }
    return () => {};
  });

  const degreesToogle = () => {
    setToogleDegrees(!toggleDegrees);
  };

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Location" />
        <button className="button" type="submit">
          Search
        </button>
      </form> */}

      <button className="toggleBtn" onClick={degreesToogle}>
        Celsius/Farenhait
      </button>

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
            <strong>Day</strong>
          </Col>
          <Col>
            <strong>Temp</strong>
          </Col>
          <Col>
            <strong>Weather</strong>
          </Col>
          <Col>
            <strong>Wind</strong>
          </Col>
          <Col>
            <strong>Hum</strong>
          </Col>
        </Row>
        {data.daily
          ? data.daily.slice(0, 6).map((day, index) => {
              return (
                <>
                  <Row>
                    <Col className="my-auto">
                      <p key={index}>{unix_dayFormating(day.dt)}</p>
                    </Col>
                    <Col className="my-auto">
                      <p key={index}>
                        {toggleDegrees
                          ? minMaxKelvinToCelsius(day.temp.max, day.temp.min)
                          : minMaxKelvinToFarenhait(day.temp.max, day.temp.min)}
                      </p>
                    </Col>
                    <Col className="my-auto">
                      <img
                        key={index}
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </Col>
                    <Col className="my-auto">
                      <p key={index}>{day.wind_speed}</p>
                    </Col>
                    <Col className="my-auto">
                      <p key={index}>{day.humidity}%</p>
                    </Col>
                  </Row>
                </>
              );
            })
          : null}
        {/*   <Row>
          <Col>
            <button onClick={()=>setShowMore((s)=>!s)}>Show More</button>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default FiveDayWeather;
