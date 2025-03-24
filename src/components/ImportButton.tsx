import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { importCardSet } from '../services/importService';
import type { ImportResult } from '../types/cardSet';

interface ImportButtonProps {
  onImportStart?: () => void;
  onImportComplete?: (result: ImportResult) => void;
  children: React.ReactNode;
  style?: object;
}

export const ImportButton: React.FC<ImportButtonProps> = ({
  onImportStart,
  onImportComplete,
  children,
  style,
}) => {
  const [isImporting, setIsImporting] = React.useState(false);

  const handleImport = async () => {
    try {
      setIsImporting(true);
      onImportStart?.();

      const result = await importCardSet();
      onImportComplete?.(result);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleImport} disabled={isImporting}>
      {isImporting ? <ActivityIndicator size="small" color="#ffffff" /> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
});
