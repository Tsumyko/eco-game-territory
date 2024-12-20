import React, { useState, useEffect } from 'react';
import { Backpack } from 'lucide-react';

const TrashItem = ({ id, type, isRemarkable, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, type, isRemarkable }));
        onDragStart();
      }}
      className={`w-16 h-16 rounded-lg shadow-md cursor-move flex items-center justify-center
        ${isRemarkable ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white'}`}
    >
      <div className="text-center">
        <div className="text-sm font-semibold">{type}</div>
        {isRemarkable && <div className="text-xs text-yellow-600">★</div>}
      </div>
    </div>
  );
};

const BinContainer = ({ type, color, onDrop }) => {
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
        border-2 border-gray-300 rounded-lg flex flex-col items-center justify-end p-2`}
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
        border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center p-2`}
    >
      <Backpack className="w-12 h-12 mb-2" />
      <div className="text-sm font-semibold">Sac à dos</div>
      <div className="text-xs text-gray-600">({items.length} objets)</div>
    </div>
  );
};

export default function TriathlonGame({ onGameComplete, onInventoryUpdate }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

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
        isRemarkable: Math.random() < 0.2
      }));
      setItems(newItems);
    };

    generateItems();
  }, [level]);

  // ... Rest of the game logic
}