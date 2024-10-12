import React from 'react';

const Logs = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Simulation Logs</h2>
      <div className="w-full max-w-4xl bg-gray-50 p-4 rounded-lg shadow">
        <pre className="text-sm font-mono whitespace-pre-wrap">[2024-10-11] Simulation started...
[2024-10-11] Organism 42 evolved...
[2024-10-11] Mutation event occurred...</pre>
      </div>
    </div>
  );
};

export default Logs;
