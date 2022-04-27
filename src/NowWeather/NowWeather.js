import React, { useState, useEffect } from "react";
import "./NowWeather.scss";
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

const NowWeather = () => {
  const [data, setData] = useState({});
  const [toggleDegrees, setToogleDegrees] = useState(true);

  useEffect(() => {
    currentLocation(setData);
  }, []);

  /*Form functions 
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
    <div className="App now-weather">
      {/* SEARCH FEATURE IN THE FUTURE
      <form onSubmit={handleSubmit}>
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
                Sunrise {unix_timeFormatting(data.current.sunrise)} / Sunset {unix_timeFormatting(data.current.sunset)}
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
