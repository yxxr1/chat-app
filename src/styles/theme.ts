import { theme } from 'antd';

export const THEMES = {
  light: {
    background: '#f0f8ff',
    'background-alt': '#ebf3fa',
    primary: '#008B8B',
    border: 'rgb(217, 217, 217)',
    text: 'rgba(0, 0, 0, 0.88)',
    'text-alt': 'rgb(119, 119, 119)',
  },
  dark: {
    background: '#1f1f1f',
    'background-alt': '#1a1a1a',
    primary: '#66CDAA',
    border: '#161616',
    text: 'rgba(255, 255, 255, 0.85)',
    'text-alt': 'rgb(119, 119, 119)',
  },
};

export const ANTD_THEMES = {
  light: { algorithm: theme.defaultAlgorithm, token: { colorPrimary: THEMES.light.primary, colorIcon: THEMES.light.primary } },
  dark: { algorithm: theme.darkAlgorithm, token: { colorPrimary: THEMES.dark.primary, colorIcon: THEMES.light.primary } },
};
