import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  // Main Stack
  Home: undefined;
  CardView: {
    setId: string;
    initialCategory?: Category;
  };
  Settings: undefined;

  // Modal Stack
  ImportModal: undefined;
};

export type Category =
  | 'Icebreakers'
  | 'Confessions'
  | 'Personality'
  | 'Deep Thoughts'
  | 'Intimacy'
  | 'Growth';

// Screen specific props
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CardViewScreenProps = NativeStackScreenProps<RootStackParamList, 'CardView'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type ImportModalProps = NativeStackScreenProps<RootStackParamList, 'ImportModal'>;
