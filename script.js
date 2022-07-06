const APIkey = "7cd8bc6beeea1b8d4ca9f672d18493c9";
const geoCodingKey = "pk.cae1fb70be9ed8648746817c82b0e03c";

var kelvin = 293.15;
var celsius = kelvin - 273.15;

const getCoords = async () => {
  const success = async (obj) => {
    const latitude = obj.coords.latitude;
    const longitude = obj.coords.longitude;

    const weatherObj = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    ).then((response) => response.json());
    const weatherConditions = weatherObj.weather.map((condition) => ({
      title: condition.main,
      description: condition.description,
    }));
    const weather = {
      temperature: weatherObj.main.temp,
      conditions: weatherConditions,
    };

    const addressObj = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${geoCodingKey}&lat=${latitude}&lon=${longitude}&format=json`
    ).then((response) => response.json());
    const cityName = addressObj?.address?.city || "Unknown City";
    console.log("addressJson", addressObj);

    // Elements in page
    const dateElem = document.getElementById("date");
    const tempElem = document.getElementById("temperature");
    const conditionsElem = document.getElementById("conditions");
    const locationElem = document.getElementById("location");

    // calculated values
    const temperature = kelvinToCelcius(weather.temperature).toFixed(1);
    // set the contents
    tempElem.innerText = `${temperature} ºC`;
    dateElem.innerText = dateString(whichLanguage());
    conditionsElem.innerHTML = conditionsString(weather.conditions);
    locationElem.innerText = cityName;
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
    <div class="condition">
      <div class="condition-title">${condition.title}</div>
      <div class="condition-desc">${condition.description}</div>
    </div>`
    )
    .join(" ");
  return `<div>${str}</div>`;
};

const whichLanguage = () => {
  const languageMap = {
    slovak: "sk-SK",
    english: "en-EN",
    dutch: "nl-NL",
  };
  const chosen = document.getElementById("language").value;
  return languageMap[chosen];
};

const register = (id, type, handler) => {
  const elem = document.getElementById(id);
  if (elem) {
    elem.addEventListener(type, handler);
  }
};

const main = () => {
  register("language", "change", () => getCoords());
  getCoords();
};
