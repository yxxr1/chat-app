import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider as StyledThemeProvider, ThemeContext } from 'styled-components';
import type { UserSettings } from '@/shared/store/types';
import { THEMES, ANTD_THEMES } from '@/shared/styles/theme';

const DEFAULT_THEME = 'light';

type ThemeProviderProps = {
  value?: UserSettings['theme'];
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value = DEFAULT_THEME, children }) => {
  return (
    <StyledThemeProvider theme={THEMES[value]}>
      <ConfigProvider theme={ANTD_THEMES[value]}>{children}</ConfigProvider>
    </StyledThemeProvider>
  );
};

export type Theme = (typeof THEMES)[typeof DEFAULT_THEME];

export const useTheme = () => useContext<Theme>(ThemeContext);

export const setTheme = (theme: UserSettings['theme']) => (window.localStorage['theme'] = theme);
export const getTheme = () => window.localStorage['theme'] || DEFAULT_THEME;
