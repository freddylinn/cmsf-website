import React from 'react';
import updatesData from '../data/updates.json';

function WebsiteUpdates() {
  return (
    <div className="mt-12 mb-8 px-4 md:px-8 text-white bg-gray-900/80 rounded-lg max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4 border-b border-white pb-2">Website Updates</h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        {updatesData.updates.map((update, index) => (
          <li key={index}>{update}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebsiteUpdates;
