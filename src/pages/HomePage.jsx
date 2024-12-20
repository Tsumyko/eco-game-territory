import React from 'react';
import { Leaf, Map, Backpack, Settings, Trophy } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const menuItems = [
    { 
      id: 'game', 
      icon: Leaf, 
      text: 'Démarrer', 
      color: 'bg-green-500 hover:bg-green-600' 
    },
    { 
      id: 'inventory', 
      icon: Backpack, 
      text: 'Inventaire', 
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      id: 'highscores', 
      icon: Trophy, 
      text: 'Scores', 
      color: 'bg-yellow-500 hover:bg-yellow-600' 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      text: 'Réglages', 
      color: 'bg-gray-500 hover:bg-gray-600' 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center text-green-800 mb-8">
          Éco-Game Territory
        </h1>
        
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${item.color} text-white rounded-xl p-4 flex items-center 
                justify-center gap-3 text-xl transition-transform transform 
                hover:scale-105 active:scale-95`}
            >
              <item.icon size={24} />
              <span>{item.text}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Version 0.1.0 - © 2024 Éco-Game Territory
        </div>
      </div>
    </div>
  );
}