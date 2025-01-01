import axios from 'axios';
import { API_KEY } from '../utils/constants';

const BASE_URL = 'https://api.shecodes.io/weather/v1/';

export const fetchWeatherByCity = async city => {
  const url = `${BASE_URL}current?query=${city}&key=${API_KEY}&units=metric`;
  const response = await axios.get(url);

  return response.data;
};

export const fetchWeatherByGeo = async (latitude, longitude) => {
  const url = `${BASE_URL}current?lon=${longitude}&lat=${latitude}&key=${API_KEY}&units=metric`;
  const response = await axios.get(url);

  return response.data;
};

export const fetchForecastByCity = async forecastCity => {
  const url = `${BASE_URL}forecast?query=${forecastCity}&key=${API_KEY}&units=metric`;

  const response = await axios.get(url);

  return response.data.daily.slice(0, 5);
};
