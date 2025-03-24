import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
  testID?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, testID } = this.props;

    if (hasError) {
      return (
        <View style={styles.container} testID={`${testID}-error`}>
          <Text style={styles.errorText}>Something went wrong</Text>
          {__DEV__ && error && <Text style={styles.errorDetails}>{error.toString()}</Text>}
        </View>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    margin: 8,
  },
  errorText: {
    color: '#b71c1c',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorDetails: {
    color: '#c62828',
    fontSize: 14,
  },
});

const ErrorBoundary: React.FC<Props> = props => {
  return <ErrorBoundaryClass {...props}>{props.children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
