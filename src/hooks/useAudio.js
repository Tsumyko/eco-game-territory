import { useState, useEffect, useCallback, useRef } from 'react';
import { audioFiles, AudioContext, preloadAudio, playSound } from '../data/audio-config';

export const useAudio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioBuffers = useRef(null);
  const musicRef = useRef(null);

  useEffect(() => {
    const loadAudio = async () => {
      audioBuffers.current = await preloadAudio();
      setIsLoaded(true);
    };

    if (AudioContext) {
      loadAudio();
    }
  }, []);

  const play = useCallback((category, sound, options = {}) => {
    if (!isLoaded || isMuted) return;
    
    const buffer = audioBuffers.current?.[category]?.[sound];
    if (buffer) {
      playSound(buffer, options);
    }
  }, [isLoaded, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { play, isLoaded, isMuted, toggleMute };
};