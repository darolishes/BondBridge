import React from 'react';
import { View, Text } from 'react-native';
import { ImportButton } from '../ImportButton';
import type { ImportResult } from '../../types/cardSet';

export default {
  title: 'Components/ImportButton',
  component: ImportButton,
};

export const Basic = () => (
  <ImportButton>
    <Text style={{ color: '#fff' }}>Import Card Set</Text>
  </ImportButton>
);

export const WithFeedback = () => {
  const [message, setMessage] = React.useState<string>('');

  const handleImportComplete = (result: ImportResult) => {
    if (result.success) {
      setMessage(`Successfully imported ${result.data?.packageName}`);
    } else {
      setMessage(`Import failed: ${result.error?.message}`);
    }
  };

  return (
    <View>
      <ImportButton onImportComplete={handleImportComplete}>
        <Text style={{ color: '#fff' }}>Import with Feedback</Text>
      </ImportButton>
      {message ? <Text style={{ marginTop: 16, color: '#333' }}>{message}</Text> : null}
    </View>
  );
};
