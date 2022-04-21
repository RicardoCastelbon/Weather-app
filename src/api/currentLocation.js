import axios from "axios";
import React from "react";
export let weatherData = null;

export async function currentLocation() {
  let getWeather = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coords = `lat=${latitude}&lon=${longitude}`;
      getWeather = getCurrentPositionWeather(coords);
    });
  } else {
    console.log("User rejected permision");
  }
  console.log(getWeather);
  return getWeather;
}

export async function getCurrentPositionWeather(coords) {
  const urlApi = `https://api.openweathermap.org/data/2.5/onecall?${coords}&exclude=&appid=516d3b7b3be366abe641fbe25b92bbfc`;
  const res = axios
    .get(urlApi)
    .then((res) => {
      weatherData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
