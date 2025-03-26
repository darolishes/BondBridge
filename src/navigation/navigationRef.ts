/**
 * Navigation Reference
 * -------------------
 * Stellt Funktionen zur programmatischen Navigation in der App bereit.
 * Erlaubt Navigation außerhalb von React-Komponenten.
 */

import { createRef } from "react";
import { NavigationContainerRef, StackActions } from "@react-navigation/native";
import type { AppScreens } from "./types";

// Erstellt eine Referenz auf den NavigationContainer
export const navigationRef = createRef<NavigationContainerRef<AppScreens>>();

/**
 * Navigiert zu einem bestimmten Screen
 * @param screen Der Ziel-Screen
 */
export function navigate(screen: AppScreens) {
  if (navigationRef.current) {
    // @ts-ignore - Die Navigation-Typen sind komplex
    navigationRef.current.navigate(screen);
  } else {
    console.warn("Navigation ist nicht bereit. Aktion: navigate", screen);
  }
}

/**
 * Navigiert zurück zum vorherigen Screen
 */
export function goBack() {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  } else {
    console.warn("Navigation ist nicht bereit. Aktion: goBack");
  }
}

/**
 * Ersetzt den aktuellen Screen im Stack
 * @param screen Der Ziel-Screen
 */
export function replace(screen: AppScreens) {
  if (navigationRef.current) {
    // @ts-ignore - Die Navigation-Typen sind komplex
    navigationRef.current.dispatch(
      StackActions.replace(screen.screen, screen.params)
    );
  } else {
    console.warn("Navigation ist nicht bereit. Aktion: replace", screen);
  }
}

/**
 * Setzt den Root-Navigator zurück
 * @param state Der neue State für den Navigator
 */
export function resetRoot(state: Partial<AppScreens>) {
  if (navigationRef.current) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [state as any],
    });
  } else {
    console.warn("Navigation ist nicht bereit. Aktion: resetRoot", state);
  }
}

/**
 * Prüft, ob die Navigation bereit ist
 */
export function isReady(): boolean {
  return !!navigationRef.current?.isReady();
}

/**
 * Gibt den aktuellen Routen-Namen zurück
 */
export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}
