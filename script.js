let loc = null
const APIkey = '7cd8bc6beeea1b8d4ca9f672d18493c9'


const getCoords = () => {
    const sucess = (obj) => {
        loc = {
            latitude : obj.coords.latitude,
            longitude : obj.coords.longitude
        }
    }
    navigator.geolocation.getCurrentPosition
}
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${APIkey}`)
.then(resp.json())
.then(forecast => {
    const weatherTemp = forecast.weather.map((condition) => condition.main)
    return {
        temperature: forecast.main.temp,
        conditions: weatherTemp
    }
})
