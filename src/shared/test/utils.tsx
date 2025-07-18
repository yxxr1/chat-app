import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@utils/theme';
import { store } from '@store';
import { UserSettings } from '@store/types';

export const renderComponent = (component: React.ReactNode, theme: UserSettings['theme'] = 'light') => {
  return render(
    <Provider store={store}>
      <ThemeProvider value={theme}>{component}</ThemeProvider>
    </Provider>,
  );
};
