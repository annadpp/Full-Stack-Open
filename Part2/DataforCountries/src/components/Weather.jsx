import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ countryName, capitalName }) => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherCodeImages = {
    0: "http://openweathermap.org/img/wn/01d@2x.png",
    1: "http://openweathermap.org/img/wn/02d@2x.png",
    2: "http://openweathermap.org/img/wn/02d@2x.png",
    3: "http://openweathermap.org/img/wn/04d@2x.png",
    45: "http://openweathermap.org/img/wn/50d@2x.png",
    48: "http://openweathermap.org/img/wn/50d@2x.png",
    51: "uhttp://openweathermap.org/img/wn/09d@2x.png",
    53: "http://openweathermap.org/img/wn/09d@2x.png",
    55: "http://openweathermap.org/img/wn/09d@2x.png",
    56: "http://openweathermap.org/img/wn/09d@2x.png",
    57: "http://openweathermap.org/img/wn/09d@2x.png",
    61: "http://openweathermap.org/img/wn/09d@2x.png",
    63: "uhttp://openweathermap.org/img/wn/09d@2x.png",
    65: "http://openweathermap.org/img/wn/09d@2x.png",
    66: "http://openweathermap.org/img/wn/09d@2x.png",
    67: "http://openweathermap.org/img/wn/09d@2x.png",
    71: "http://openweathermap.org/img/wn/13d@2x.png",
    73: "http://openweathermap.org/img/wn/13d@2x.png",
    75: "http://openweathermap.org/img/wn/13d@2x.png",
    77: "http://openweathermap.org/img/wn/13d@2x.png",
    80: "http://openweathermap.org/img/wn/10d@2x.png",
    81: "http://openweathermap.org/img/wn/10d@2x.png",
    82: "http://openweathermap.org/img/wn/10d@2x.png",
    85: "http://openweathermap.org/img/wn/13d@2x.png",
    86: "http://openweathermap.org/img/wn/13d@2x.png",
    95: "http://openweathermap.org/img/wn/11d@2x.png",
    96: "http://openweathermap.org/img/wn/11d@2x.png",
    99: "http://openweathermap.org/img/wn/11d@2x.png",
  };

  useEffect(() => {
    const getWeather = (countryName, capitalName) => {
      return axios
        .get("https://geocoding-api.open-meteo.com/v1/search", {
          params: {
            name: `${capitalName}, ${countryName}`,
          },
        })
        .then((geocodingResponse) => {
          const result = geocodingResponse.data.results[0];

          return axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
              latitude: result.latitude,
              longitude: result.longitude,
              current_weather: true,
            },
          });
        })
        .then((forecastResponse) => forecastResponse.data.current_weather)
        .catch((error) => {
          console.log(`Error while fetching weather data: ${error.message}`);
          return null;
        });
    };

    const fetchData = async () => {
      if (capitalName === undefined) {
        return;
      }

      const data = await getWeather(countryName, capitalName);

      setWeatherData(data);
    };

    fetchData();
  }, [capitalName, countryName]);

  if (weatherData === null) {
    return null;
  }

  return (
    <>
      <h2>Weather in {capitalName}</h2>
      <img src={weatherCodeImages[weatherData.weathercode]} />
      <ul>
        <li>Temperature: {weatherData.temperature} &deg; C</li>
        <li>Wind speed: {weatherData.windspeed} km/h</li>
      </ul>
    </>
  );
};

export default Weather;
