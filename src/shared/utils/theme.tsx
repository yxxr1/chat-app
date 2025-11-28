import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider as StyledThemeProvider, ThemeContext } from 'styled-components';
import type { Theme } from '@/shared/styles';
import { THEMES, ANTD_THEMES } from '@/shared/styles';

const DEFAULT_THEME: Theme = 'light';

type ThemeProviderProps = {
  value?: Theme;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value = DEFAULT_THEME, children }) => {
  return (
    <StyledThemeProvider theme={THEMES[value]}>
      <ConfigProvider theme={ANTD_THEMES[value]}>{children}</ConfigProvider>
    </StyledThemeProvider>
  );
};

export type DefaultTheme = (typeof THEMES)[typeof DEFAULT_THEME];

export const useTheme = () => useContext<DefaultTheme>(ThemeContext);

export const setTheme = (theme: Theme) => (window.localStorage['theme'] = theme);
export const getTheme = () => window.localStorage['theme'] || DEFAULT_THEME;
