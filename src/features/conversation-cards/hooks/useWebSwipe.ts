import { useEffect, useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import { WebSwipeAdapter, type SwipeConfig } from "../adapters/WebSwipeAdapter";

interface UseWebSwipeProps extends Omit<SwipeConfig, "element"> {
  enabled?: boolean;
}

type WebStyle = {
  touchAction?: string;
  userSelect?: string;
  willChange?: string;
  backfaceVisibility?: string;
  transform?: string;
};

export function useWebSwipe(props: UseWebSwipeProps) {
  const adapterRef = useRef<WebSwipeAdapter | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web" || !props.enabled || !elementRef.current) {
      return;
    }

    // Adapter initialisieren
    adapterRef.current = new WebSwipeAdapter({
      element: elementRef.current,
      onSwipeLeft: props.onSwipeLeft,
      onSwipeRight: props.onSwipeRight,
      onSwipeProgress: props.onSwipeProgress,
      swipeThreshold: props.swipeThreshold,
      velocityThreshold: props.velocityThreshold,
      cssTransition: props.cssTransition,
      enableHardwareAcceleration: props.enableHardwareAcceleration,
    });

    // Cleanup beim Unmount
    return () => {
      adapterRef.current?.cleanup();
      adapterRef.current = null;
    };
  }, [
    props.enabled,
    props.onSwipeLeft,
    props.onSwipeRight,
    props.onSwipeProgress,
    props.swipeThreshold,
    props.velocityThreshold,
    props.cssTransition,
    props.enableHardwareAcceleration,
  ]);

  const getProps = () => {
    const webStyle: WebStyle = {
      touchAction: "pan-y",
      userSelect: "none",
      ...(props.enableHardwareAcceleration && {
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }),
    };

    return {
      ref: elementRef,
      style: Platform.select({
        web: StyleSheet.flatten([webStyle]),
        default: {},
      }),
    };
  };

  return {
    elementRef,
    getProps,
  };
}
