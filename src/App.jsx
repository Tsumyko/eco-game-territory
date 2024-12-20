import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GameMap from './pages/GameMap';
import InventoryPage from './pages/InventoryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [playerData, setPlayerData] = useState({
    score: 0,
    inventory: [
      {
        id: 'test-item-1',
        name: 'Vieille Boussole',
        description: 'Une boussole ancienne en laiton',
        story: 'Utilisée par les premiers guides du parc',
        zone: 'Mont Lozère'
      }
    ],
    completedZones: [],
    unlockedZones: ['mont-lozere']
  });

  const navigateTo = (page, data = {}) => {
    setCurrentPage(page);
    // Stocker les données supplémentaires si nécessaire
    if (data.zoneId) {
      setCurrentZone(data.zoneId);
    }
  };

  const updatePlayerData = (newData) => {
    setPlayerData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'game':
        return (
          <GameMap
            playerData={playerData}
            onUpdatePlayer={updatePlayerData}
            onNavigate={navigateTo}
          />
        );
      case 'inventory':
        return (
          <InventoryPage
            inventory={playerData.inventory}
            onNavigate={navigateTo}
          />
        );
      case 'settings':
        return <div>Settings Page</div>;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {renderPage()}
    </div>
  );
}
