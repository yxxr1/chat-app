import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/shared/utils/theme';
import { store } from '@/shared/store';
import { UserSettings } from '@/shared/store/types';

export const renderComponent = (component: React.ReactNode, theme: UserSettings['theme'] = 'light') => {
  return render(
    <Provider store={store}>
      <ThemeProvider value={theme}>{component}</ThemeProvider>
    </Provider>,
  );
};
