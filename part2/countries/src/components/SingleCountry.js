import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState({});

  const iconUrl = () => {
    return Object.hasOwn(weather, "weather")
      ? `http://openweathermap.org/img/wn/${weather.weather.at(0).icon}@2x.png`
      : "";
  };

  useEffect(() => {
    axios
      .get(
        `${WEATHER_BASE_URL}?q=${country.capital}&units=metric&appid=${API_KEY}`
      )
      .then((response) => setWeather(response.data));
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital}
        <br />
        area {country.area}
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} width="180" alt="country flag" />
      </div>
      <h2>Weather in {country.capital}</h2>
      temperature {weather?.main?.temp} Celcius
      <br />
      <img src={iconUrl()} alt="weather icon" />
      <br />
      wind {weather?.wind?.speed} m/s
    </div>
  );
};

export default SingleCountry;
