import type { ProgressError, ProgressErrorCode } from '@types';

/**
 * Creates a standardized progress error object
 */
export function createProgressError(
  code: ProgressErrorCode,
  message: string,
  details?: unknown
): ProgressError {
  return { code, message, details };
}

/**
 * Determines if an error is a progress error
 */
export function isProgressError(error: unknown): error is ProgressError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error &&
    typeof (error as ProgressError).message === 'string'
  );
}

/**
 * Gets a user-friendly error message from a progress error
 */
export function getProgressErrorMessage(error: ProgressError): string {
  switch (error.code) {
    case 'STORAGE_ERROR':
      return 'Failed to access progress data. Please try again.';
    case 'INVALID_DATA':
      return 'Invalid progress data format.';
    case 'NOT_FOUND':
      return 'Progress data not found.';
    case 'NETWORK_ERROR':
      return 'Network error. Please check your connection.';
    default:
      return error.message;
  }
}
