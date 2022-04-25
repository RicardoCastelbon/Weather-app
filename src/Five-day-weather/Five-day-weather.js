import React, { useState, useEffect } from "react";
import axios from "axios";
import "./"
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const FiveDayWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState([]);

  const [showMore, setShowMore] = useState(false);

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

  useEffect(() => {
    if (data.current) {
      setSunrise(unix_timeFormatting(data.current.sunrise));
      setSunset(unix_timeFormatting(data.current.sunset));
      //displayWeatherIcon(data.weather[0].id);
    }
    if (data.daily) {
      setHours(data.daily);
      const formated = unix_dateFormatting(data.daily[1].dt);
      console.log(formated);
    }

    return () => {};
  });
  console.log(hours);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Location" />
        <button className="button" type="submit">
          Search
        </button>
      </form>

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
                {Math.floor(data.current.temp - 273.15)}°C
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
                      <p key={hour}>{Math.floor(hour.temp - 273.15)}°C</p>
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

export default FiveDayWeather;
