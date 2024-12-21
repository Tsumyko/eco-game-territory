import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import GameMap from './pages/GameMap';
import InventoryPage from './pages/InventoryPage';
import ZoneGame from './pages/ZoneGame';
import SettingsPage from './pages/SettingsPage';
import { loadData, saveData, getDefaultPlayerData } from './utils/storage';
import { useAudio } from './hooks/useAudio';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentZone, setCurrentZone] = useState(null);
  const [playerData, setPlayerData] = useState(getDefaultPlayerData());
  const { play, isLoaded, isMuted, toggleMute } = useAudio();

  // Chargement des données au démarrage
  useEffect(() => {
    const savedData = loadData();
    if (savedData) {
      setPlayerData(savedData);
    }
  }, []);

  const navigateTo = (page, data = {}) => {
    setCurrentPage(page);
    if (data.zoneId) {
      setCurrentZone(data.zoneId);
    }
    play('ui', 'click', { volume: playerData.settings.sfxVolume / 100 });
  };

  const updatePlayerData = (newData) => {
    const updatedData = {
      ...playerData,
      ...newData
    };
    setPlayerData(updatedData);
    saveData(updatedData);
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
      case 'zone-game':
        return currentZone ? (
          <ZoneGame
            zoneId={currentZone}
            playerData={playerData}
            onUpdatePlayer={updatePlayerData}
            onNavigate={navigateTo}
          />
        ) : (
          <GameMap
            playerData={playerData}
            onUpdatePlayer={updatePlayerData}
            onNavigate={navigateTo}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            settings={playerData.settings}
            onUpdateSettings={(newSettings) => {
              updatePlayerData({ settings: newSettings });
              if (isMuted !== !newSettings.soundEnabled) {
                toggleMute();
              }
            }}
            onNavigate={navigateTo}
          />
        );
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
