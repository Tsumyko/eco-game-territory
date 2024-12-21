const STORAGE_KEY = 'eco-game-territory';

export const saveData = (data) => {
  try {
    const saveState = {
      version: '1.0.0',
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
    return true;
  } catch (error) {
    console.error('Error saving game data:', error);
    return false;
  }
};

export const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const saveState = JSON.parse(saved);
    // Version check pourrait être ajouté ici pour des migrations futures
    return saveState.data;
  } catch (error) {
    console.error('Error loading game data:', error);
    return null;
  }
};

export const clearData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing game data:', error);
    return false;
  }
};

export const getDefaultPlayerData = () => ({
  score: 0,
  inventory: [],
  completedZones: [],
  unlockedZones: ['mont-lozere'],
  settings: {
    soundEnabled: true,
    musicVolume: 70,
    sfxVolume: 80,
    language: 'fr',
    difficulty: 'normal'
  }
});