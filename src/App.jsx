import React, { useState } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [playerData, setPlayerData] = useState({
    score: 0,
    inventory: [],
    completedZones: [],
    unlockedZones: ['mont-lozere']
  });

  const navigateTo = (page) => {
    setCurrentPage(page);
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
          <div>Game Page</div>
        );
      case 'inventory':
        return (
          <div>Inventory Page</div>
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
