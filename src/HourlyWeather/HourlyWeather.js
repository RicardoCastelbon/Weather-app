import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HourlyWeather.scss";
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
} from "../providers/utilities";

const HourlyWeather = () => {
  const [data, setData] = useState({});
  const [toggleDegrees, setToogleDegrees] = useState(true);


  useEffect(() => {
     currentLocation(setData);
  }, []);

 /* Form functions
  const handleChange = (e) => {
    setLocation(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //getLocation();
  }; */

  const degreesToogle = () => {
    setToogleDegrees(!toggleDegrees);
  };

  return (
    <div className="App hourly-weather">
      {/*  <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Location" />
        <button className="button" type="submit">
          Search
        </button>
      </form>
 */}
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
            <strong>Hour</strong>
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
        {data.hourly
          ? data.hourly.slice(0, 24).map((hour) => {
              return (
                <>
                  <Row>
                    <Col className="my-auto">
                      <p key={hour}>{unix_timeFormatting(hour.dt)}</p>
                    </Col>
                    <Col className="my-auto">
                      <p key={hour}>
                        {toggleDegrees
                          ? kelvinToCelsius(hour.temp)
                          : kelvinToFarenhait(hour.temp)}
                      </p>
                    </Col>
                    <Col className="my-auto">
                      <img
                        key={hour}
                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </Col>
                    <Col className="my-auto">
                      <p key={hour}>{hour.wind_speed}</p>
                    </Col>
                    <Col className="my-auto">
                      <p key={hour}>{hour.humidity}%</p>
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

export default HourlyWeather;
