import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ImportButton from '@components/ImportButton';
import type { ImportResult } from '@types';

interface MessageState {
  text: string;
  type: 'success' | 'error';
}

const MessageRenderer = ({
  message,
  isLoading,
}: {
  message?: MessageState;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  }

  if (!message) return null;

  return (
    <Text
      style={[
        styles.message,
        message.type === 'success' ? styles.successMessage : styles.errorMessage,
      ]}
    >
      {message.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
    fontSize: 14,
  },
  successMessage: {
    color: '#34c759',
  },
  errorMessage: {
    color: '#ff3b30',
  },
});

export default {
  title: 'Components/ImportButton',
  component: ImportButton,
};

const mockCardSet = {
  id: '1',
  name: 'Basic Card Set',
  description: 'A basic set of cards',
  image: require('@assets/images/basic-set.png'),
  totalCards: 10,
  categories: ['Icebreakers', 'Personality'],
};

export const Basic = () => (
  <ImportButton
    onPress={async () => {
      const result: ImportResult = {
        success: true,
        data: mockCardSet,
      };
      return result;
    }}
  />
);

export const WithFeedback = () => {
  const [message, setMessage] = useState<MessageState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (): Promise<ImportResult> => {
    setIsLoading(true);
    setMessage(undefined);

    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: ImportResult = {
      success: true,
      data: {
        ...mockCardSet,
        name: 'Sample Card Set',
      },
    };

    setIsLoading(false);
    if (result.success) {
      setMessage({
        text: `Successfully imported ${result.data?.name}`,
        type: 'success',
      });
    } else {
      setMessage({
        text: `Import failed: ${result.error?.message}`,
        type: 'error',
      });
    }

    return result;
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <MessageRenderer message={message} isLoading={isLoading} />
    </View>
  );
};

export const WithNetworkError = () => {
  const [message, setMessage] = useState<MessageState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (): Promise<ImportResult> => {
    setIsLoading(true);
    setMessage(undefined);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: ImportResult = {
      success: false,
      error: {
        code: 'FILE_ERROR',
        message: 'Network connection failed',
      },
    };

    setIsLoading(false);
    setMessage({
      text: `Import failed: ${result.error?.message}`,
      type: 'error',
    });

    return result;
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <MessageRenderer message={message} isLoading={isLoading} />
    </View>
  );
};

export const WithInvalidJsonError = () => {
  const [message, setMessage] = useState<MessageState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (): Promise<ImportResult> => {
    setIsLoading(true);
    setMessage(undefined);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: ImportResult = {
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON format in card set file',
      },
    };

    setIsLoading(false);
    setMessage({
      text: `Import failed: ${result.error?.message}`,
      type: 'error',
    });

    return result;
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <MessageRenderer message={message} isLoading={isLoading} />
    </View>
  );
};

export const WithDuplicatePackageError = () => {
  const [message, setMessage] = useState<MessageState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (): Promise<ImportResult> => {
    setIsLoading(true);
    setMessage(undefined);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: ImportResult = {
      success: false,
      error: {
        code: 'DUPLICATE',
        message: 'Card set "Basic Japanese" already exists',
      },
    };

    setIsLoading(false);
    setMessage({
      text: `Import failed: ${result.error?.message}`,
      type: 'error',
    });

    return result;
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <MessageRenderer message={message} isLoading={isLoading} />
    </View>
  );
};

export const WithInvalidSchemaError = () => {
  const [message, setMessage] = useState<MessageState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (): Promise<ImportResult> => {
    setIsLoading(true);
    setMessage(undefined);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: ImportResult = {
      success: false,
      error: {
        code: 'INVALID_SCHEMA',
        message: 'Card set schema validation failed: Missing required fields (question, category)',
      },
    };

    setIsLoading(false);
    setMessage({
      text: `Import failed: ${result.error?.message}`,
      type: 'error',
    });

    return result;
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <MessageRenderer message={message} isLoading={isLoading} />
    </View>
  );
};
