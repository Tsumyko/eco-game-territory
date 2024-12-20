import React, { useState, useEffect } from 'react';
import { Map, Home, Backpack } from 'lucide-react';
import zones from '../data/zones.json';

const ZoneMarker = ({ zone, isUnlocked, isCompleted, onClick }) => {
  return (
    <button
      onClick={() => isUnlocked && onClick(zone)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2
        w-16 h-16 rounded-full flex items-center justify-center transition-all
        ${isUnlocked 
          ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
          : 'bg-gray-400 cursor-not-allowed'}
        ${isCompleted ? 'ring-4 ring-yellow-400' : ''}`}
      style={{
        left: `${zone.position.x}%`,
        top: `${zone.position.y}%`
      }}
    >
      <Map className="w-8 h-8 text-white" />
      <div className="absolute -bottom-8 whitespace-nowrap text-sm font-semibold
        bg-white px-2 py-1 rounded shadow">
        {zone.name}
      </div>
    </button>
  );
};

export default function GameMap({ playerData, onUpdatePlayer, onNavigate }) {
  const [selectedZone, setSelectedZone] = useState(null);

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">Score: {playerData.score}</div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('inventory')}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Backpack className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative w-full h-[calc(100vh-4rem)] bg-blue-100">
        <div className="absolute inset-0 bg-[url('/backgrounds/cevennes-map.jpg')] 
          bg-cover bg-center">
          {zones.zones.map(zone => (
            <ZoneMarker
              key={zone.id}
              zone={zone}
              isUnlocked={playerData.unlockedZones.includes(zone.id)}
              isCompleted={playerData.completedZones.includes(zone.id)}
              onClick={handleZoneClick}
            />
          ))}
        </div>
      </div>

      {/* Zone Selection Modal */}
      {selectedZone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
          justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedZone.name}</h2>
            <p className="text-gray-600 mb-4">{selectedZone.description}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedZone(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg 
                  hover:bg-gray-600"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  // Start game for selected zone
                  onNavigate('game-zone', { zoneId: selectedZone.id });
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg 
                  hover:bg-green-600"
              >
                Jouer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}