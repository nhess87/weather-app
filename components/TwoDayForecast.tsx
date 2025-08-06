// This component displays the 2-day weather forecast.
//
import React from 'react';

interface ForecastItem {
  date: string;
  high: number;
  low: number;
}


const TwoDayForecast = ({ forecast }: { forecast: ForecastItem[] }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4">2-Day Forecast</h3>
      {forecast.length > 0 ? (
        <div className="flex flex-wrap justify-between items-center text-center">
          {forecast.map((date, index) => (
            <div key={index} className="flex-1 min-w-[70px] m-1 p-2 rounded-xl">
              <p className="text-sm text-gray-400">{date.date}</p>
              <p className="text-sm font-semibold">{date.high}°F</p>
              <p className="text-xs text-gray-400">{date.low}°F</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 p-4">
          Forecast data not available.
        </div>
      )}
    </div>
  );
};


export default TwoDayForecast;