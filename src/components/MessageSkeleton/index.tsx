import React, { useMemo } from 'react';
import { Skeleton } from './styled';

export const MessageSkeleton: React.FC = () => {
  const widthIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  return <Skeleton widthIndex={widthIndex} size="small" />;
};
