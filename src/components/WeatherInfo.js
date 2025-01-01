import React from 'react';
import Forecast from './Forecast';
import WeatherTemp from './WeatherTemp';
import { days, months } from '../utils/constants';

export default function WeatherInfo({ response }) {
  const date = new Date(response.time * 1000);

  return (
    <>
      <div className="row mb-4">
        <div className="col-4">
          <img
            className="currentIcon img-fluid"
            src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.condition.icon}.png`}
            alt="current weather image"
          />
          <p className="currentDescription">{response.condition.description}</p>
        </div>
        <div className="col-4 d-flex flex-column justify-content-center gap-2">
          <h1 className="current-city">{response.city}</h1>
          <p className="current-date">
            {days[date.getDay()]}, {date.getUTCDate()}
          </p>
          <p className="current-month">{months[date.getUTCMonth()]}</p>
        </div>
        <div className="col-4 d-flex flex-column justify-content-center gap-2">
          <WeatherTemp temperatureInCelcius={response.temperature.current} />
          <p className="current-humidity">
            humidity: {response.temperature.humidity}%
          </p>
          <p className="current-wind">
            wind: {Math.round(response.wind.speed)} km/hr
          </p>
        </div>
      </div>
      <Forecast response={response} />
    </>
  );
}
