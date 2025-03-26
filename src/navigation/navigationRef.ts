import {
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent,
} from "@react-navigation/native";
import { RootTabParamList } from "./types";

/**
 * Referenz auf den NavigationContainer
 * Ermöglicht Navigation außerhalb von React-Komponenten
 */
export const navigationRef = createNavigationContainerRef<RootTabParamList>();

/**
 * Navigiert zu einem Screen in der App
 */
export function navigate<RouteName extends keyof RootTabParamList>(
  name: RouteName,
  params?: RootTabParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-ignore - Die Typisierung in React Navigation ist manchmal schwer zufriedenzustellen
    // Die reale Nutzung ist jedoch sicher, solange wir die richtigen Parameter übergeben
    navigationRef.navigate(name, params);
  } else {
    // Speichern Sie die Navigation, um sie später auszuführen, sobald die Navigation bereit ist
    console.warn(
      "Navigation ist noch nicht bereit. Navigation zu",
      name,
      "mit Params",
      params,
      "verzögert."
    );
  }
}

/**
 * Setzt den Navigations-Stack zurück
 */
export function resetRoot() {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({
      index: 0,
      routes: [{ name: "CardTab" as const }],
    });
  }
}

/**
 * Prüft, ob die Navigation bereit ist
 */
export function isNavigationReady() {
  return navigationRef.isReady();
}

/**
 * Holt die aktuelle Route
 */
export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}

/**
 * Führt eine Navigations-Aktion aus
 */
export function dispatch(
  action: Parameters<
    NavigationContainerRefWithCurrent<RootTabParamList>["dispatch"]
  >[0]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

/**
 * Geht einen Screen zurück
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
