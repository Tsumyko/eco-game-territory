import React from 'react';
import { ArrowLeft } from 'lucide-react';

const CollectibleCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
      <img
        src={item.image}
        alt={item.name}
        className="max-w-full max-h-full object-contain"
      />
    </div>
    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
    <p className="text-xs text-gray-500 italic">{item.story}</p>
  </div>
);

export default function InventoryPage({ inventory, onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('game')}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Inventaire</h1>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              Votre inventaire est vide. Partez à la recherche d'objets 
              remarquables !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map(item => (
              <CollectibleCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}