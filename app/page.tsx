"use client";
//
// This is the main page component that orchestrates the entire application.
// It handles state, data fetching, and renders the other smaller components.
//

import React, { useState, useEffect } from 'react';
import { LuSearch } from "react-icons/lu";
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import TwoDayForecast from '@/components/TwoDayForecast';
import HourlyChart from '@/components/HourlyChart';
import WindGauge from '@/components/WindGauge';


interface CurrentWeather {
  current_temperature: number;
  sky: string;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  visibility: number;
  uv_index: number;
  description: string;
}

interface ForecastItem {
  date: string;
  high: number;
  low: number;
  }

interface HourlyItem {
  time: string;
  temp: number;
}

const Home = () => {
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
     setLoading(true);
      setError(null);

  try {
    const response = await fetch('http://127.0.0.1:3001/weather-details', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, state })
      });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data. Please check the city and state.');
      }

    const data = await response.json();
    // FIX: Added a default empty array for `hourly` to prevent the "cannot read 'map' of undefined" error.
    const { currently, hourly = [] } = data;
      

    // Check if `currently` data is available before proceeding
    if (currently) {

        const { forecasts = [] } = currently;
        console.log('forcast arry is :', forecasts)
        // Extract the current weather details
        const currentWeatherData: CurrentWeather = {
        current_temperature: currently.current_temperature,
        sky: currently.sky,
        feels_like: currently.feels_like,
        humidity: currently.humidity,
        wind_speed: currently.wind_speed,
        wind_direction: currently.wind_direction,
        visibility: currently.visibility,
        uv_index: currently.uv_index,
        description: currently.description,
      };

      // Extract the forecast data
        const forecastData: ForecastItem[] = forecasts.slice(0, 2).map((item: any) => ({
          date: item.date,
          high: item.high_temperature,
          low: item.low_temperature,
        }));

       // Extract the hourly data
      const hourlyChartData: HourlyItem[] = hourly.map((item: any) => ({
        time: item.time,
        temp: item.temperature
        }));

      setCurrentWeather(currentWeatherData);
      setForecast(forecastData);
      setHourlyData(hourlyChartData);
      } else {
        throw new Error("Weather data not found for this location.");
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setCurrentWeather(null);
    } finally {
     setLoading(false);
    }
  };

  useEffect(() => {
  fetchWeatherData();
  }, []); // Empty dependency array to fetch data once on mount

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     fetchWeatherData();
    };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col p-4 font-sans overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col h-full">

        {/* Search Input Section */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full p-3 pl-10 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuSearch className="text-gray-400" />
            </div>
          </div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state/country code"
            className="w-full sm:w-1/3 p-3 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-800 text-white rounded-xl text-center mb-6">
            Error: {error}
          </div>
        )}

        {currentWeather && (
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-0">
            {/* Left side, takes up one column */}
            <div className="flex flex-col gap-6">
              <CurrentWeatherCard
                data={currentWeather}
                city={city}
                state={state}
              />
            </div>
            <div className="flex flex-col gap-6 h-full">
              <TwoDayForecast forecast={forecast} />
              <HourlyChart data={hourlyData} />
              <WindGauge speed={currentWeather.wind_speed} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
 