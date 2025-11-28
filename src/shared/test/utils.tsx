import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@/shared/utils/theme';
import type { Theme } from '@/shared/styles';

export const renderComponent = (component: React.ReactNode, store: ReturnType<typeof configureStore>, theme: Theme = 'light') => {
  return render(
    <Provider store={store}>
      <ThemeProvider value={theme}>{component}</ThemeProvider>
    </Provider>,
  );
};
