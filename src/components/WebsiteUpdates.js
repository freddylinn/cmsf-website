import WebsiteUpdates from "../components/WebsiteUpdates";
import updatesData from "../data/updates.json";

function WebsiteUpdates() {
  return (
    <div className="mt-12 mb-8 px-4 md:px-8 text-white bg-gray-900/80 rounded-lg max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4 border-b border-white pb-2">Website Updates</h2>
      {updatesData.updates.map((update, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold mb-1">{update.date}</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            {update.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WebsiteUpdates;
