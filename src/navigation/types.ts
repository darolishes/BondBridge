import { NavigationProp, RouteProp } from "@react-navigation/native";

/**
 * Navigation Types
 * ---------------
 * Typendefinitionen für die Navigation in der App.
 * Definiert die Parameter und Routen für die verschiedenen Navigator-Typen.
 */

/**
 * Root-Tab-Navigation-Parameter
 */
export type RootTabParamList = {
  CardTab: undefined;
  SettingsTab: undefined;
};

/**
 * Card-Stack-Navigation-Parameter
 */
export type CardStackParamList = {
  CardList: undefined;
  CardDetail: { cardId: string };
  CardCreate: undefined;
  CardEdit: { cardId: string };
  CardSet: undefined;
};

/**
 * Settings-Stack-Navigation-Parameter
 */
export type SettingsStackParamList = {
  SettingsHome: undefined;
  ThemeSettings: undefined;
  NotificationSettings: undefined;
  About: undefined;
};

/**
 * Typ für die Navigation-Props in den Card-Screens
 */
export type CardScreenNavigationProp = NavigationProp<CardStackParamList>;

/**
 * Typ für die Route-Props in den Card-Screens
 */
export type CardScreenRouteProp<T extends keyof CardStackParamList> = RouteProp<
  CardStackParamList,
  T
>;

/**
 * Typ für die Navigation-Props in den Settings-Screens
 */
export type SettingsScreenNavigationProp =
  NavigationProp<SettingsStackParamList>;

/**
 * Typ für die Route-Props in den Settings-Screens
 */
export type SettingsScreenRouteProp<T extends keyof SettingsStackParamList> =
  RouteProp<SettingsStackParamList, T>;

/**
 * Typ für alle möglichen Screen-Namen
 */
export type AppScreens =
  | {
      screen: keyof RootTabParamList;
      params?: never;
    }
  | {
      screen: "CardTab";
      params: {
        screen: keyof CardStackParamList;
        params: CardStackParamList[keyof CardStackParamList];
      };
    }
  | {
      screen: "SettingsTab";
      params: {
        screen: keyof SettingsStackParamList;
        params: SettingsStackParamList[keyof SettingsStackParamList];
      };
    };

/**
 * Deklaration für das erweiterung des React Navigation Namespace
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
