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

//Convert unix timestamp to h/m/s
export const unix_timeFormatting = (data) => {
  //let data = data.sys.sunrise;
  let date = new Date(data * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
};

//Convert unix to day of the week
export const unix_dateFormatting = (data) => {
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
 export const unix_dayFormating = (data) => {
    let date = new Date(data * 1000);
    let day = date.getDate();
    return day;
  };
