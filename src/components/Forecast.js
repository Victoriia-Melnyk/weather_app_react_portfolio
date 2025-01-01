import React, { useState, useEffect } from 'react';
import ForecastDay from './ForecastDay';
import { fetchForecastByCity } from '../services/weatherApi';

export default function Forecast({ response }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const forecast = await fetchForecastByCity(response.city);

        setForecastData(forecast);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [response]);

  return (
    <>
      {loading && <p>Loading forecast...</p>}
      {forecastData && (
        <div className="d-flex flex-wrap justify-content-center">
          {forecastData.map((forecastDay, index) => (
            <ForecastDay key={index} forecastDay={forecastDay} />
          ))}
        </div>
      )}
    </>
  );
}
