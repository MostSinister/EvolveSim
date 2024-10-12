import React, { useState } from 'react';

const Settings = () => {
  const [maxOrganisms, setMaxOrganisms] = useState(1000);
  const [mutationRate, setMutationRate] = useState(0.05);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex flex-col space-y-4 w-full max-w-xl">
        <div className="flex justify-between items-center">
          <label className="text-lg">Max Organisms</label>
          <input
            type="number"
            value={maxOrganisms}
            onChange={(e) => setMaxOrganisms(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg w-24 text-right"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-lg">Mutation Rate</label>
          <input
            type="number"
            value={mutationRate}
            step="0.01"
            min="0"
            max="1"
            onChange={(e) => setMutationRate(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg w-24 text-right"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
