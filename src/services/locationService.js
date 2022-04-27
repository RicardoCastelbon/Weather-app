import axios from "axios";

export async function currentLocation(setData) {
  let weather;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coords = `lat=${latitude}&lon=${longitude}`;
      weather = await getCurrentPositionWeather(coords);
      setData(weather);
    });
  } else {
    console.log("User rejected permision");
  }
}

export async function getCurrentPositionWeather(coords) {
  const urlApi = `https://api.openweathermap.org/data/2.5/onecall?${coords}&exclude=&appid=516d3b7b3be366abe641fbe25b92bbfc`;
  try {
    const res = await axios.get(urlApi);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
