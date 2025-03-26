import type { NavigatorScreenParams } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * Parameter-Typen für den Card-Stack
 */
export type CardStackParamList = {
  CardList: undefined;
  CardDetail: { cardId: string };
  CardCreate: undefined;
  CardEdit: { cardId: string };
};

/**
 * Parameter-Typen für den Import/Export-Stack
 */
export type ImportExportStackParamList = {
  ImportExportHome: undefined;
  ImportData: undefined;
  ExportData: { selectedDeckIds?: string[] };
};

/**
 * Parameter-Typen für den Settings-Stack
 */
export type SettingsStackParamList = {
  SettingsHome: undefined;
  ThemeSettings: undefined;
  NotificationSettings: undefined;
  About: undefined;
};

/**
 * Parameter-Typen für den Root-Tab-Navigator
 */
export type RootTabParamList = {
  CardTab: NavigatorScreenParams<CardStackParamList>;
  ImportExportTab: NavigatorScreenParams<ImportExportStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

/**
 * Vereinigter Typ für alle Screen-Props in der Anwendung
 */
export type ScreenProps = {
  // Card Stack Screen Props
  CardList: NativeStackScreenProps<CardStackParamList, "CardList">;
  CardDetail: NativeStackScreenProps<CardStackParamList, "CardDetail">;
  CardCreate: NativeStackScreenProps<CardStackParamList, "CardCreate">;
  CardEdit: NativeStackScreenProps<CardStackParamList, "CardEdit">;

  // Import/Export Stack Screen Props
  ImportExportHome: NativeStackScreenProps<
    ImportExportStackParamList,
    "ImportExportHome"
  >;
  ImportData: NativeStackScreenProps<ImportExportStackParamList, "ImportData">;
  ExportData: NativeStackScreenProps<ImportExportStackParamList, "ExportData">;

  // Settings Stack Screen Props
  SettingsHome: NativeStackScreenProps<SettingsStackParamList, "SettingsHome">;
  ThemeSettings: NativeStackScreenProps<
    SettingsStackParamList,
    "ThemeSettings"
  >;
  NotificationSettings: NativeStackScreenProps<
    SettingsStackParamList,
    "NotificationSettings"
  >;
  About: NativeStackScreenProps<SettingsStackParamList, "About">;

  // Tab Screen Props
  CardTab: BottomTabScreenProps<RootTabParamList, "CardTab">;
  ImportExportTab: BottomTabScreenProps<RootTabParamList, "ImportExportTab">;
  SettingsTab: BottomTabScreenProps<RootTabParamList, "SettingsTab">;
};

/**
 * Deklaration für das erweiterung des React Navigation Namespace
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
