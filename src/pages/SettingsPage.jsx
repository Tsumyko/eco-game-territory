import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SettingsPage = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicVolume: 70,
    sfxVolume: 80,
    language: 'fr',
    difficulty: 'normal'
  });

  const handleSoundToggle = () => {
    setSettings(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const handleVolumeChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="secondary" 
        className="mb-6" 
        onClick={() => onNavigate('home')}
      >
        Retour
      </Button>

      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      <div className="space-y-6">
        <Card title="Audio" className="w-full max-w-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Son</span>
              <Button 
                variant="secondary" 
                onClick={handleSoundToggle}
                className="flex items-center"
              >
                {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Musique ({settings.musicVolume}%)</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={settings.musicVolume}
                onChange={(e) => handleVolumeChange('musicVolume', parseInt(e.target.value))}
                className="w-full"
                disabled={!settings.soundEnabled}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Effets sonores ({settings.sfxVolume}%)</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={settings.sfxVolume}
                onChange={(e) => handleVolumeChange('sfxVolume', parseInt(e.target.value))}
                className="w-full"
                disabled={!settings.soundEnabled}
              />
            </div>
          </div>
        </Card>

        <Card title="Général" className="w-full max-w-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm">Langue</label>
              <select 
                value={settings.language}
                onChange={(e) => handleVolumeChange('language', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Difficulté</label>
              <select 
                value={settings.difficulty}
                onChange={(e) => handleVolumeChange('difficulty', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="easy">Facile</option>
                <option value="normal">Normal</option>
                <option value="hard">Difficile</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;