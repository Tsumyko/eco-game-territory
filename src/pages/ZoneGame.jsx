import React from 'react';
import { ArrowLeft } from 'lucide-react';
import TriathlonGame from '../components/game/TriathlonGame';

export default function ZoneGame({ zoneId, playerData, onUpdatePlayer, onNavigate }) {
  const handleGameComplete = (score) => {
    // Mettre à jour les données du joueur
    const updatedData = {
      ...playerData,
      score: playerData.score + score,
      completedZones: [...playerData.completedZones, zoneId],
      // Débloquer la zone suivante si elle existe
      unlockedZones: [...playerData.unlockedZones]
    };

    // Logique pour débloquer la zone suivante
    const zoneOrder = ['mont-lozere', 'vallee-francaise', 'mont-aigoual', 'causses', 'vallee-longue'];
    const currentIndex = zoneOrder.indexOf(zoneId);
    if (currentIndex < zoneOrder.length - 1) {
      const nextZone = zoneOrder[currentIndex + 1];
      if (!updatedData.unlockedZones.includes(nextZone)) {
        updatedData.unlockedZones.push(nextZone);
      }
    }

    onUpdatePlayer(updatedData);
    onNavigate('game');
  };

  const handleInventoryUpdate = (newInventory) => {
    onUpdatePlayer({
      ...playerData,
      inventory: newInventory
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => onNavigate('game')}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Zone: {zoneId}</h1>
        </div>
      </div>

      {/* Jeu */}
      <TriathlonGame
        zoneId={zoneId}
        onGameComplete={handleGameComplete}
        onInventoryUpdate={handleInventoryUpdate}
      />
    </div>
  );
}