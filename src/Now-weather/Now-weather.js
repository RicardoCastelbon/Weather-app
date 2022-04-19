import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Now-weather.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
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
      console.log(res.data);
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
              <p className="text-start">Day * / Night *</p>
            </Row>
          </Col>
          <Col className="p-4">
            <FontAwesomeIcon icon={faSun} className="fa-10x " color="#F3D229" />
          </Col>
        </Row>
      </Container>

      <Container className="mt-3">
        <Row className="">
          <Col className="mt-4">
            <Row>
              <Col>High / Low Temp</Col>
              <Col>
                {data.main ? (
                  <p>{Math.floor(data.main.temp_max - 273.15)}°</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>Feels like</Col>
              <Col>18°</Col>
            </Row>
            <Row>
              <Col>Humidity</Col>
              <Col>30%</Col>
            </Row>
            <Row>
              <Col>Pressure</Col>
              <Col>30%</Col>
            </Row>
          </Col>
          <Col className="mt-4">
            <Row>
              <Col>Sunrise/Sunset</Col>
              <Col>30%</Col>
            </Row>
            <Row>
              <Col>Wind</Col>
              <Col>30%</Col>
            </Row>
            <Row>High/Low</Row>
            <Row>High/Low</Row>
          </Col>
        </Row>
      </Container>
      <div>
        <h1>{data.name}</h1>
        {data.main ? <h1>{Math.floor(data.main.temp - 273.15)}</h1> : null}
      </div>
    </div>
  );
}

export default NowWeather;
