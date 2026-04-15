import { Themes } from 'types';

// 简约专业的科研科技风格配色
export const themes: Themes = {
  dark: {
    key: 'dark',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#a0aec0',
    tertiaryTextColor: '#718096',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
    shadowColor: '#00d4ff33',
  },
  light: {
    key: 'light',
    primaryTextColor: '#1a202c',
    secondaryTextColor: '#4a5568',
    tertiaryTextColor: '#718096',
    background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
    shadowColor: '#0066cc22',
  },
};
