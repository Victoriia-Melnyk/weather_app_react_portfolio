import React, { useState } from 'react';
import cn from 'classnames';

export default function WeatherTemp({ temperatureInCelcius }) {
  const [unit, setUnit] = useState('celcius');

  const convertTemperature = temp =>
    unit === 'celcius' ? temp : (temp * 9) / 5 + 32;

  const handleUnitChange = (event, selectedUnit) => {
    event.preventDefault();
    setUnit(selectedUnit);
  };

  return (
    <span className="current-temperature">
      {Math.round(convertTemperature(temperatureInCelcius))}{' '}
      <sup>
        <a
          href="/"
          className={cn('celciusLink', { nonActive: unit === 'celcius' })}
          onClick={event => handleUnitChange(event, 'celcius')}
        >
          °C
        </a>
        {' | '}
        <a
          href="/"
          className={cn('fahrenheitLink', { nonActive: unit === 'fahrenheit' })}
          onClick={event => handleUnitChange(event, 'fahrenheit')}
        >
          °F
        </a>
      </sup>
    </span>
  );
}
