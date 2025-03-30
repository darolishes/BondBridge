import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";

export interface SwipeMetrics {
  fps: number;
  frameTime: number;
  droppedFrames: number;
  totalFrames: number;
  dragDistance: number;
}

interface UseSwipePerformanceOptions {
  targetFps?: number;
  sampleSize?: number;
  enableDebug?: boolean;
}

interface PerformanceFrame {
  timestamp: number;
  position: number;
}

export function useSwipePerformance({
  targetFps = 60,
  sampleSize = 60,
  enableDebug = false,
}: UseSwipePerformanceOptions = {}) {
  const [metrics, setMetrics] = useState<SwipeMetrics>({
    fps: targetFps,
    frameTime: 1000 / targetFps,
    droppedFrames: 0,
    totalFrames: 0,
    dragDistance: 0,
  });

  const framesRef = useRef<PerformanceFrame[]>([]);
  const startTimeRef = useRef<number>(0);
  const lastPositionRef = useRef<number>(0);
  const totalDistanceRef = useRef<number>(0);
  const droppedFramesRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const isTrackingRef = useRef<boolean>(false);

  const calculateMetrics = useCallback(() => {
    if (!isTrackingRef.current || framesRef.current.length < 2) return;

    const frames = framesRef.current;
    const timeSpan = frames[frames.length - 1].timestamp - frames[0].timestamp;
    const fps = (frames.length * 1000) / timeSpan;
    const frameTime = timeSpan / frames.length;

    // Berechne theoretische Frame-Anzahl basierend auf targetFps
    const expectedFrames = Math.floor(timeSpan * (targetFps / 1000));
    const droppedFrames = Math.max(0, expectedFrames - frames.length);

    droppedFramesRef.current += droppedFrames;
    frameCountRef.current += frames.length;

    if (enableDebug) {
      setMetrics({
        fps: Number(fps.toFixed(1)),
        frameTime: Number(frameTime.toFixed(2)),
        droppedFrames: droppedFramesRef.current,
        totalFrames: frameCountRef.current,
        dragDistance: Math.abs(totalDistanceRef.current),
      });
    }
  }, [targetFps, enableDebug]);

  const startTracking = useCallback(
    (initialPosition: number, timestamp: number = Date.now()) => {
      framesRef.current = [];
      startTimeRef.current = timestamp;
      lastPositionRef.current = initialPosition;
      totalDistanceRef.current = 0;
      droppedFramesRef.current = 0;
      frameCountRef.current = 0;
      isTrackingRef.current = true;

      if (Platform.OS === "web") {
        requestAnimationFrame(() => {
          framesRef.current.push({
            timestamp,
            position: initialPosition,
          });
        });
      } else {
        framesRef.current.push({
          timestamp,
          position: initialPosition,
        });
      }
    },
    []
  );

  const updatePosition = useCallback(
    (newPosition: number, timestamp: number = Date.now()) => {
      if (!isTrackingRef.current) return;

      const distance = Math.abs(newPosition - lastPositionRef.current);
      totalDistanceRef.current += distance;
      lastPositionRef.current = newPosition;

      if (Platform.OS === "web") {
        requestAnimationFrame(() => {
          framesRef.current.push({ timestamp, position: newPosition });
          if (framesRef.current.length > sampleSize) {
            framesRef.current.shift();
          }
          calculateMetrics();
        });
      } else {
        framesRef.current.push({ timestamp, position: newPosition });
        if (framesRef.current.length > sampleSize) {
          framesRef.current.shift();
        }
        calculateMetrics();
      }
    },
    [sampleSize, calculateMetrics]
  );

  const stopTracking = useCallback(() => {
    isTrackingRef.current = false;
    calculateMetrics();
  }, [calculateMetrics]);

  return {
    metrics,
    startTracking,
    updatePosition,
    stopTracking,
  };
}
