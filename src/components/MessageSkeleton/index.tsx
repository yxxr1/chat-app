import React, { useMemo, memo } from 'react';
import { Skeleton } from './styled';

export const _MessageSkeleton: React.FC = () => {
  const widthIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  return <Skeleton widthIndex={widthIndex} size="small" />;
};

export const MessageSkeleton = memo(_MessageSkeleton);
