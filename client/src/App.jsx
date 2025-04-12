import { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const getWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=16a2314e91b166c8c3c5b3c33539f22b`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (cityName) => {
    if (!cityName) {
      setError("Please enter a city name!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=16a2314e91b166c8c3c5b3c33539f22b`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SearchBox onSearch={handleSearch} />
          {error && <p className="error-message">{error}</p>}
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </>
      )}
      <footer>
        <p>
          <a
            href="https://www.linkedin.com/in/kartkp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2025 Kartikey Pandey.
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
