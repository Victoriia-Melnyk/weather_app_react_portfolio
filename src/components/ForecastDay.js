import React from 'react';
import { days } from '../utils/constants';

export default function ForecastDay({ forecastDay }) {
  const date = new Date(forecastDay.time * 1000);

  return (
    <>
      <div className="forecast-day">
        <img
          className="img-fluid"
          src={forecastDay.condition.icon_url}
          alt="forecast image"
        />
        <p className="fs-6">{days[date.getDay()]}</p>
        <p className="forecast-temperatures">
          <span className="forecastTemperatureMax">
            {Math.round(forecastDay.temperature.maximum)}°
          </span>{' '}
          <span className="forecastTemperatureMin">
            {Math.round(forecastDay.temperature.minimum)}°
          </span>
        </p>
      </div>
    </>
  );
}
