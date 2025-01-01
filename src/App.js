import 'bootstrap/dist/css/bootstrap.css';
import './normalize.scss';
import './App.scss';
import React, { useState } from 'react';
import { MagnifyingGlass, Blocks } from 'react-loader-spinner';
import WeatherInfo from './components/WeatherInfo';
import { fetchWeatherByCity, fetchWeatherByGeo } from './services/weatherApi';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  function addCity(event) {
    setCity(event.target.value);
  }

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          resolve({ latitude, longitude });
        },
        error => reject(error),
      );
    });
  }

  async function handleSearchByCity(event) {
    event.preventDefault();
    if (!city) {
      return;
    }

    setLoading(true);
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city);

      setWeather(data);
    } catch (error) {
    } finally {
      setLoading(false);
      setCity('');
    }
  }

  async function handleSearchByGeo(event) {
    event.preventDefault();
    setLoading(true);
    setWeather(null);

    try {
      const { latitude, longitude } = await getCurrentLocation();
      const data = await fetchWeatherByGeo(latitude, longitude);

      setWeather(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-7">
              <div
                className="widget
                          p-3
                          rounded"
              >
                <form id="form">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a city..."
                        onChange={addCity}
                        value={city}
                      />
                    </div>

                    <div className="col-12 col-md-6 d-flex gap-2 mb-4">
                      <button
                        className="btn btn-outline-secondary flex-grow-1"
                        type="button"
                        onClick={handleSearchByCity}
                      >
                        GO
                      </button>
                      <button
                        className="btn btn-outline-secondary flex-grow-1"
                        type="button"
                        onClick={handleSearchByGeo}
                      >
                        Use my location
                      </button>
                    </div>
                  </div>
                </form>
                {!loading && !weather && (
                  <>
                    <p className="text-align-center">Choose the city ...</p>
                    <MagnifyingGlass
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="magnifying-glass-loading"
                      wrapperStyle={{}}
                      wrapperClass="magnifying-glass-wrapper"
                      glassColor="#c0efff"
                      color="#5585b5"
                    />
                  </>
                )}
                {loading && (
                  <Blocks
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                  />
                )}
                {weather && <WeatherInfo response={weather} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
