/**
 * Navigation Index
 * ---------------
 * Zentraler Einstiegspunkt für die Navigation.
 * Exportiert die verschiedenen Navigator-Komponenten und die Navigation-Referenz.
 */

import { createNavigationContainerRef } from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import { CardStack } from "./CardStack";
import { SettingsStack } from "./SettingsStack";
import * as NavigationRef from "./navigationRef";
import type { AppScreens } from "./types";

// Re-export Navigator-Komponenten
export { TabNavigator, CardStack, SettingsStack };

// Re-export Navigation-Referenz
export { NavigationRef };

// Re-export Navigation-Typen
export type {
  RootTabParamList,
  CardStackParamList,
  SettingsStackParamList,
  CardScreenNavigationProp,
  CardScreenRouteProp,
  SettingsScreenNavigationProp,
  SettingsScreenRouteProp,
  AppScreens,
} from "./types";

// Erstellt eine typisierte Navigation-Referenz
export const navigationRef = createNavigationContainerRef<AppScreens>();

// Exportiert Navigation-Helfer-Funktionen
export const navigate = NavigationRef.navigate;
export const goBack = NavigationRef.goBack;
export const resetRoot = NavigationRef.resetRoot;
