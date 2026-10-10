import { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 192;

export const getFrameUrl = (index) => {
  const frameNum = String(index + 1).padStart(4, '0');
  return `/images/frame-${frameNum}.jpg`;
};

export const useFrameSequence = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef(new Array(TOTAL_FRAMES).fill(false));
  const lastDrawnFrameRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const images = imagesRef.current;
    const isLoaded = isLoadedRef.current;

    // First load Frame 0 immediately for instant display
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (!isMounted) return;
      images[0] = firstImg;
      isLoaded[0] = true;
      lastDrawnFrameRef.current = firstImg;
      setLoadedCount(1);
      setIsInitialReady(true);
    };

    // Load all remaining frames using a fast concurrent worker pool
    // Sequential order preserves natural loading from assembled to exploded
    const queue = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1);
    const CONCURRENCY = 16;
    let active = 0;

    const loadNext = () => {
      if (!isMounted || queue.length === 0) return;
      const index = queue.shift();
      active++;

      const img = new Image();
      img.src = getFrameUrl(index);

      img.onload = () => {
        if (!isMounted) return;
        images[index] = img;
        isLoaded[index] = true;
        setLoadedCount((prev) => prev + 1);
        active--;
        loadNext();
      };

      img.onerror = () => {
        if (!isMounted) return;
        active--;
        loadNext();
      };
    };

    // Spawn concurrent loaders
    for (let i = 0; i < CONCURRENCY; i++) {
      loadNext();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Nearest frame resolver that strictly avoids forward jumps
  const getNearestFrame = useCallback((targetIndex) => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(targetIndex)));
    const images = imagesRef.current;
    const isLoaded = isLoadedRef.current;

    // Exact match
    if (isLoaded[clamped] && images[clamped]) {
      lastDrawnFrameRef.current = images[clamped];
      return images[clamped];
    }

    // Search downward first to smoothly hold current position without jumping ahead
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = clamped - offset;
      if (left >= 0 && isLoaded[left] && images[left]) {
        lastDrawnFrameRef.current = images[left];
        return images[left];
      }
      const right = clamped + offset;
      if (right < TOTAL_FRAMES && isLoaded[right] && images[right]) {
        lastDrawnFrameRef.current = images[right];
        return images[right];
      }
    }

    return lastDrawnFrameRef.current || images[0];
  }, []);

  return {
    totalFrames: TOTAL_FRAMES,
    loadedCount,
    isInitialReady,
    progressPercent: Math.round((loadedCount / TOTAL_FRAMES) * 100),
    getNearestFrame,
  };
};
