import axios from "axios";

export const fetchCurrentWeather = async () => {
  const urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=516d3b7b3be366abe641fbe25b92bbfc`;
  return axios
    .get(urlLocation)
    .then((res) => {
      //setData(res.data);
      console.log(res.data);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
