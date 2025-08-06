// This component renders the wind speed gauge using SVG.
//
import React from 'react';

const WindGauge = ({ speed } : {speed: number}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col justify-between items-center">
      <h3 className="text-xl font-bold mb-4">Wind Speed Gauge</h3>
      <div className="relative w-40 h-20">
        {/* Gauge background arc */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            stroke="#4B5563"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* Filled arc representing wind speed */}
          <path
            d="M10 100 A90 90 0 0 1 120 20"
            stroke="#FBBF24"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom transform -translate-x-1/2 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-50%) rotate(${(-90 + (speed / 50) * 180)}deg)`,
            backgroundColor: 'white'
          }}
        ></div>
      </div>
      <div className="mt-4 text-3xl font-semibold">
        {speed} <span className="text-xl font-normal text-gray-400">km/h</span>
      </div>
    </div>
  );
};

export default WindGauge;