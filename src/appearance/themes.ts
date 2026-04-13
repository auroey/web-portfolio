import { Themes } from 'types';

// 使用更柔和、更有科技感的配色方案
export const themes: Themes = {
  dark: {
    key: 'dark',
    primaryTextColor: '#e0e0e0',
    secondaryTextColor: '#b0b0b0',
    tertiaryTextColor: '#808080',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    shadowColor: '#0000007f',
  },
  light: {
    key: 'light',
    primaryTextColor: '#2c3e50',
    secondaryTextColor: '#34495e',
    tertiaryTextColor: '#7f8c8d',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    shadowColor: '#ffffff7f',
  },
};
