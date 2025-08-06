// This component displays the current weather details.
import React from "react";

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

interface CurrentWeatherCardProps {
  data: CurrentWeather;
  city: string;
  state: string;
}

const CurrentWeatherCard = ({ data, city, state }: CurrentWeatherCardProps) => {
  if (!data) return null;
  
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4">{city}, {state}</h3>
      <div className="flex items-center justify-between">
        <div className="text-6xl font-light">{data.current_temperature}°C</div>
        <div className="text-5xl">
          <span>{data.sky}</span>
        </div>
      </div>
      
      <div className="mt-4 text-xl text-gray-300">
        Feels like: {data.feels_like}°C
      </div>
      
      <div className="mt-2 text-xl text-gray-300 text-right">
        {data.description}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-gray-400">
        <div>
          <span className="font-semibold">Humidity:</span> {data.humidity}%
        </div>
        <div>
          <span className="font-semibold">Wind:</span> {data.wind_speed} km/h {data.wind_direction}
        </div>
        <div>
          <span className="font-semibold">Visibility:</span> {data.visibility} km
        </div>
        <div>
          <span className="font-semibold">UV Index:</span> {data.uv_index}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;