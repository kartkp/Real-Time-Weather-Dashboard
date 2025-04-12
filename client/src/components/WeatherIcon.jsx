const WeatherIcon = ({ weatherCondition }) => {
    const icons = {
        Clear: "/icons/day.svg",
        Clouds: "/icons/cloudy.svg",
        Snow: "/icons/snowy-6.svg",
        Rain: "/icons/rainy-6.svg",
        Drizzle: "/icons/rainy-7.svg",
        Thunderstorm: "/icons/thunder.svg",
        Mist: "/icons/rainy-7.svg",
        Smoke: "/icons/rainy-7.svg",
        Haze: "/icons/rainy-7.svg",
        Dust: "/icons/rainy-7.svg",
        Fog: "/icons/rainy-7.svg",
        Sand: "/icons/rainy-7.svg",
        Ash: "/icons/rainy-7.svg",
        Squall: "/icons/rainy-7.svg",
        Tornado: "/icons/cloudy.svg",
      };
  
    return (
      <div className="icon-container">
        <img 
          src={icons[weatherCondition] || icons.Clear} 
          alt="Weather icon" 
          className="weather-icon"
        />
      </div>
    );
  };
  
  export default WeatherIcon;