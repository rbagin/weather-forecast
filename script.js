const APIkey = "7cd8bc6beeea1b8d4ca9f672d18493c9";
var kelvin = 293.15;
var celsius = kelvin - 273.15;
const getCoords = () => {
  const success = (obj) => {
    const latitude = obj.coords.latitude;
    const longitude = obj.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    )
      .then((resp) => resp.json())
      .then((forecast) => {
        const weatherConditions = forecast.weather.map((condition) => ({
          title: condition.main,
          description: condition.description,
        }));
        return {
          temperature: forecast.main.temp,
          conditions: weatherConditions,
        };
      })
      .then((weather) => {
        const dateElem = document.getElementById("date");
        const tempElem = document.getElementById("temperature");
        const conditionsElem = document.getElementById("conditions");
        const temperature = kelvinToCelcius(weather.temperature).toFixed(1);
        // set the contents
        tempElem.innerText = `${temperature} ºC`;
        dateElem.innerText = dateString("sk-SK");
        debugger;
        conditionsElem.innerHTML = conditionsString(weather.conditions);
      });
  };
  navigator.geolocation.getCurrentPosition(success);
};

const kelvinToCelcius = (temperature) => temperature - 273.15;

const dateString = (locale) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date().toLocaleDateString(locale, options);
};

const conditionsString = (conditions) => {
  const str = conditions
    .map(
      (condition) => `
    <div>
      <span class="condition-title">${condition.title}</span>
      <span class="condition-desc">${condition.description}</span>
    </div>`
    )
    .join(" ");
  return `<div>${str}</div>`;
};
