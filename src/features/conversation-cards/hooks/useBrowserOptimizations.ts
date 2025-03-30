import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { BrowserOptimizationAdapter } from "../adapters/BrowserOptimizationAdapter";

interface BrowserOptimizations {
  styles: Record<string, any>;
  eventOptions: AddEventListenerOptions;
  supportsWebP: boolean;
  imageQuality: "low" | "medium" | "high";
  isReducedMotion: boolean;
  devicePixelRatio: number;
  isLoading: boolean;
  error: Error | null;
}

const defaultOptimizations: BrowserOptimizations = {
  styles: {},
  eventOptions: { passive: true, capture: false },
  supportsWebP: false,
  imageQuality: "medium",
  isReducedMotion: false,
  devicePixelRatio: 1,
  isLoading: true,
  error: null,
};

export function useBrowserOptimizations(): BrowserOptimizations {
  const [optimizations, setOptimizations] =
    useState<BrowserOptimizations>(defaultOptimizations);

  useEffect(() => {
    if (Platform.OS !== "web") {
      setOptimizations((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    async function initializeOptimizations() {
      try {
        const adapter = await BrowserOptimizationAdapter.getInstance();

        setOptimizations({
          styles: adapter.getBrowserStyles(),
          eventOptions: adapter.getEventOptions(),
          supportsWebP: adapter.shouldUseWebP(),
          imageQuality: adapter.getImageQuality(),
          isReducedMotion: adapter.isReducedMotionPreferred(),
          devicePixelRatio: adapter.getDevicePixelRatio(),
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setOptimizations((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error : new Error("Unbekannter Fehler"),
        }));
      }
    }

    initializeOptimizations();
  }, []);

  // Listening für prefers-reduced-motion Änderungen
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = async () => {
      try {
        const adapter = await BrowserOptimizationAdapter.getInstance();

        setOptimizations((prev) => ({
          ...prev,
          isReducedMotion: adapter.isReducedMotionPreferred(),
          styles: adapter.getBrowserStyles(),
        }));
      } catch (error) {
        console.error(
          "Fehler beim Aktualisieren der Bewegungseinstellungen:",
          error
        );
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback für ältere Browser
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback für ältere Browser
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return optimizations;
}

// Hilfsfunktion für optimierte Bild-URLs
export function getOptimizedImageUrl(
  url: string,
  quality: BrowserOptimizations["imageQuality"]
): string {
  if (!url) return url;

  const qualityMap = {
    low: 0.6,
    medium: 0.8,
    high: 1.0,
  };

  const parsedUrl = new URL(url);

  // Füge Qualitätsparameter hinzu, wenn die URL von unserem CDN kommt
  if (parsedUrl.hostname.includes("our-cdn.com")) {
    parsedUrl.searchParams.set("q", String(qualityMap[quality] * 100));
  }

  return parsedUrl.toString();
}

// Hilfsfunktion für optimierte Animationen
export function getOptimizedTransition(
  isReducedMotion: boolean,
  defaultDuration = 300,
  defaultEasing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
): string {
  if (isReducedMotion) {
    // Reduzierte oder keine Animation für Benutzer, die dies bevorzugen
    return "none";
  }

  return `transform ${defaultDuration}ms ${defaultEasing}`;
}
