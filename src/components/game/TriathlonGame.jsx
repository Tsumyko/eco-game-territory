import React, { useState, useEffect } from 'react';
import { Backpack } from 'lucide-react';

const TrashItem = ({ id, type, isRemarkable, imageUrl }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, type, isRemarkable }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`w-16 h-16 rounded-lg shadow-md cursor-move
        flex items-center justify-center transition-transform
        hover:scale-105 active:scale-95
        ${isRemarkable ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white'}`}
    >
      <div className="text-center">
        {imageUrl ? (
          <img src={imageUrl} alt={type} className="w-12 h-12 object-contain" />
        ) : (
          <div className="text-sm font-semibold">{type}</div>
        )}
        {isRemarkable && <div className="text-xs text-yellow-600">★</div>}
      </div>
    </div>
  );
};

const TrashBin = ({ type, color, onDrop }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (!data.isRemarkable) {
        onDrop(data, type);
      }
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`w-24 h-32 ${isOver ? 'bg-green-100' : 'bg-gray-100'} 
        border-2 border-gray-300 rounded-lg flex flex-col items-center justify-end p-2
        transition-colors`}
    >
      <div className="text-sm font-semibold mb-2">{type}</div>
      <div className={`w-full h-20 rounded-lg bg-${color}`}></div>
    </div>
  );
};

const BackpackContainer = ({ onDrop, items }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data.isRemarkable) {
            onDrop(data);
          }
        } catch (error) {
          console.error('Erreur lors du drop:', error);
        }
      }}
      className={`w-32 h-40 ${isOver ? 'bg-yellow-100' : 'bg-gray-100'} 
        border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center p-2
        transition-colors`}
    >
      <Backpack className="w-12 h-12 mb-2" />
      <div className="text-sm font-semibold">Sac à dos</div>
      <div className="text-xs text-gray-600">({items.length} objets)</div>
    </div>
  );
};

export default function TriathlonGame({ zoneData, onGameComplete, onInventoryUpdate }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);

  const bins = [
    { type: 'plastique', color: 'yellow-400' },
    { type: 'verre', color: 'green-400' },
    { type: 'papier', color: 'blue-400' }
  ];

  useEffect(() => {
    const generateItems = () => {
      const trashTypes = bins.map(bin => bin.type);
      const newItems = Array(6).fill(null).map((_, index) => ({
        id: `item-${index}`,
        type: trashTypes[Math.floor(Math.random() * trashTypes.length)],
        isRemarkable: Math.random() < 0.2 && level === 3, // Only spawn remarkable items in last level
      }));
      setItems(newItems);
    };

    generateItems();
  }, [level]);

  const handleBinDrop = (item, binType) => {
    if (item.type === binType) {
      setScore(prev => prev + 100);
      setItems(prev => {
        const newItems = prev.filter(i => i.id !== item.id);
        if (newItems.length === 0) {
          if (level < 3) {
            setLevel(prev => prev + 1);
          } else {
            onGameComplete?.(score + 100);
          }
        }
        return newItems;
      });
    } else {
      setScore(prev => Math.max(0, prev - 50));
    }
  };

  const handleBackpackDrop = (item) => {
    setInventory(prev => {
      const newInventory = [...prev, item];
      onInventoryUpdate?.(newInventory);
      return newInventory;
    });
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Niveau {level}/3</div>
          <div className="text-2xl font-bold">{score} points</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center gap-8 mb-12">
            {bins.map((bin) => (
              <TrashBin
                key={bin.type}
                {...bin}
                onDrop={handleBinDrop}
              />
            ))}
            <BackpackContainer
              items={inventory}
              onDrop={handleBackpackDrop}
            />
          </div>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {items.map((item) => (
              <TrashItem
                key={item.id}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}