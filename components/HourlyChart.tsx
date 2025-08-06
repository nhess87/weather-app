// This component renders the hourly temperature chart using SVG.
//
import React from 'react';


interface HourlyDataPoint {
  time: string;
  temp: number;
}


const HourlyChart = ({ data }: {data: HourlyDataPoint[]}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Hourly Temperature Chart</h3>
      <div className="w-full h-40">
        <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <text x="0" y="20" className="text-xs text-gray-400" dominantBaseline="middle">1gh</text>
          <text x="380" y="20" className="text-xs text-gray-400" dominantBaseline="middle">24h</text>
          <path
            d="M20 140 C 100 100, 180 80, 200 60 S 300 100, 380 120"
            stroke="#8B5CF6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((point, index) => (
            <React.Fragment key={index}>
              <circle cx={20 + index * 80} cy={140 - (point.temp - 10) * 4} r="4" fill="#8B5CF6" />
              <text x={20 + index * 80} y={155} className="text-xs fill-current text-gray-400">{point.time}</text>
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default HourlyChart;