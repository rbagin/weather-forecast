const APIkey = "7cd8bc6beeea1b8d4ca9f672d18493c9";

const getCoords = () => {
  const success = (obj) => {
    const latitude = obj.coords.latitude;
    const longitude = obj.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    )
      .then((resp) => resp.json())
      .then((forecast) => {
        const weatherTemp = forecast.weather.map((condition) => condition.main);
        return {
          temperature: forecast.main.temp,
          conditions: weatherTemp,
        };
      })
      .then((weather) => {
        const weatherReport = `<div>${weather.temperature}</div>
    <div>${weather.conditions
      .map((condition) => `<span>${condition}</span>`)
      .join(" ")}</div>`;
        const appElem = document.getElementById("app");
        appElem.innerHTML = weatherReport;
      });
  };
  navigator.geolocation.getCurrentPosition(success);
};
