import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import { useTheme } from '@utils/theme';

export const Loader = () => {
  const theme = useTheme();

  return <LoaderSpinner type="BallTriangle" color={theme.primary} height={50} width={50} />;
};
