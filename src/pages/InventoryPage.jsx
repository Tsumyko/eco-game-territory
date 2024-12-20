import React from 'react';
import { ArrowLeft } from 'lucide-react';

const CollectibleCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
      {/* L'image sera remplacée par la vraie image de l'item */}
      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
        Image
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      <p className="text-xs text-gray-500 italic">{item.story}</p>
    </div>
  </div>
);

export default function InventoryPage({ inventory, onNavigate }) {
  // Organisation des items par zone
  const itemsByZone = inventory.reduce((acc, item) => {
    if (!acc[item.zone]) {
      acc[item.zone] = [];
    }
    acc[item.zone].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('game')}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600
              transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Collection d'Objets Remarquables</h1>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              Votre collection est vide pour le moment.
            </p>
            <p className="text-gray-500">
              Explorez les différentes zones pour découvrir des objets remarquables !
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(itemsByZone).map(([zone, items]) => (
              <div key={zone}>
                <h2 className="text-2xl font-semibold mb-4">{zone}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(item => (
                    <CollectibleCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats rapides */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Statistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-600">Total objets</p>
              <p className="text-2xl font-bold">{inventory.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Zones explorées</p>
              <p className="text-2xl font-bold">{Object.keys(itemsByZone).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}