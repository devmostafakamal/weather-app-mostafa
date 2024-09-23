import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
export default function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [icon, setIcon] = useState("04d");
  const allIcons = () => {
    "01d: clear_icon",
      "01n:clear_icon",
      "02d:cloud_icon",
      "02n:cloud_icon",
      "03d:cloud_icon",
      "03n:cloud_icon";
  };
  const search = async (city) => {
    if (!city.trim()) {
      alert("enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city} &units=metric&appid=${`b80ecf172366c44dc3e7e7f63f40689e`}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("Dinajpur");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src="/assets/search.png"
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
        alt=""
        className="weather-icon"
      />
      <p className="temperature">{weatherData.temperature} c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src="/assets/humidity.png" alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src="/assets/wind.png" alt="" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
