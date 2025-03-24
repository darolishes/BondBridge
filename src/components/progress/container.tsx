import React, { useCallback, useEffect } from 'react';
import { ProgressPresentation } from './presentation';
import { ProgressContainerProps } from './types';
import { useProgress } from '@hooks/useProgress';

export const ProgressContainer: React.FC<ProgressContainerProps> = ({
  id,
  onProgressUpdate,
  onError,
  ...presentationProps
}) => {
  const { progress, percentage, error, isLoading, loadProgress } = useProgress(id);

  useEffect(() => {
    if (progress && onProgressUpdate) {
      onProgressUpdate(progress);
    }
  }, [progress, onProgressUpdate]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleRetry = useCallback(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <ProgressPresentation
      {...presentationProps}
      progress={progress}
      percentage={percentage}
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
    />
  );
};

export default React.memo(ProgressContainer);
