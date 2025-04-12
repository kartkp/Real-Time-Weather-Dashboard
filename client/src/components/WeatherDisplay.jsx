import { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import { getBackgroundColor, getFormattedDate, getAQIDescription } from '../utils/weatherService';

const WeatherDisplay = ({ weatherData }) => {
  const [geoData, setGeoData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {

    const fetchGeoData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&limit=1&appid=16a2314e91b166c8c3c5b3c33539f22b`
        );
        const data = await response.json();
        setGeoData(data[0]);
      } catch (err) {
        console.error('Error fetching geo data:', err);
      }
    };
    const fetchAQIData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=16a2314e91b166c8c3c5b3c33539f22b`
        );
        const data = await response.json();
        setAqiData(data.list[0]);
      } catch (err) {
        console.error('Error fetching AQI data:', err);
      }
    };

    fetchGeoData();
    fetchAQIData();
    getBackgroundColor(weatherData.main.temp);
  }, [weatherData]);

  const getPrecipitation = () => {
    if (weatherData.rain) {
      return `${weatherData.rain['1h']} mm`;
    }
    return '0 mm';
  };

  const getTemperatureInCelsius = (temp) => {
    return Math.floor(((temp - 32) * 5) / 9);
  };

  return (
    <main className="weather-app">
      <div className="gap location">
        <h1>{geoData?.name || 'N/A'}</h1>
        <p>{`${geoData?.state || 'N/A'}, ${geoData?.country || 'N/A'}`}</p>
        <p>{getFormattedDate(weatherData.timezone)}</p>
        <p>{`Coordinates: Latitude ${weatherData.coord.lat}, Longitude ${weatherData.coord.lon}`}</p>
      </div>

      <WeatherIcon weatherCondition={weatherData.weather[0].main} />

      <div className="gap weather-info">
        <h2>{weatherData.weather[0].main}</h2>
        <p>{`${getTemperatureInCelsius(weatherData.main.temp)}°C`}</p>
        <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
        <p>{`Precipitation: ${getPrecipitation()}`}</p>
        <p>{`AQI: ${aqiData ? getAQIDescription(aqiData.main.aqi) : 'Loading...'}`}</p>
      </div>
    </main>
  );
};

export default WeatherDisplay;