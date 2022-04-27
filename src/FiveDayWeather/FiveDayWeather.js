import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FiveDayWeather.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import { currentLocation } from "../services/locationService";
import {
  kelvinToCelsius,
  kelvinToFarenhait,
  minMaxKelvinToFarenhait,
  minMaxKelvinToCelsius,
  unix_dateFormatting,
  unix_timeFormatting,
  unix_dayFormating,
} from "../providers/utilities";

const FiveDayWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [date, setDate] = useState("");
  const [days, setDays] = useState([]);
  const [toggleDegrees, setToogleDegrees] = useState(true);

  useEffect(() => {
    currentLocation(setData);
  }, []);

  /* form functions
  const handleChange = (e) => {
    setLocation(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
  }; */

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
                Sunrise {unix_timeFormatting(data.current.sunrise)} / Sunset{" "}
                {unix_timeFormatting(data.current.sunset)}
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
