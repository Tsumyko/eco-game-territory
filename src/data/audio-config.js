export const audioFiles = {
  ui: {
    click: '/src/assets/sounds/ui/click.mp3',
    hover: '/src/assets/sounds/ui/hover.mp3',
    success: '/src/assets/sounds/ui/success.mp3',
    error: '/src/assets/sounds/ui/error.mp3',
  },
  game: {
    pickup: '/src/assets/sounds/game/pickup.mp3',
    drop: '/src/assets/sounds/game/drop.mp3',
    collect: '/src/assets/sounds/game/collect.mp3',
    victory: '/src/assets/sounds/game/victory.mp3',
  },
  music: {
    menu: '/src/assets/sounds/music/menu.mp3',
    game: '/src/assets/sounds/music/game.mp3',
  },
};

export const AudioContext = typeof window !== 'undefined' ? new window.AudioContext() : null;

export const preloadAudio = async () => {
  const audioBuffers = {};
  
  const loadFile = async (path) => {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await AudioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  try {
    Object.keys(audioFiles).forEach(category => {
      audioBuffers[category] = {};
      Object.keys(audioFiles[category]).forEach(async sound => {
        audioBuffers[category][sound] = await loadFile(audioFiles[category][sound]);
      });
    });
  } catch (error) {
    console.error('Error loading audio files:', error);
  }

  return audioBuffers;
};

export const playSound = async (buffer, options = {}) => {
  if (!AudioContext) return;
  
  const source = AudioContext.createBufferSource();
  const gainNode = AudioContext.createGain();
  
  source.buffer = buffer;
  gainNode.gain.value = options.volume || 1;
  
  source.connect(gainNode);
  gainNode.connect(AudioContext.destination);
  
  source.start(0);
};