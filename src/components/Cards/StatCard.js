import React from 'react';

const StatCard = ({ title, value, color, isDarkMode }) => (
  <div className={`shadow-md rounded-lg p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} h-full flex flex-col justify-center items-center no-select transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>{title}</h3>
    <p className={`text-2xl font-bold ${color} text-center`}>{value}</p>
  </div>
);

export default StatCard;
