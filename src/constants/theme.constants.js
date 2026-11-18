export const THEME_STORAGE_KEY = 'app_theme_mode';

export const PALETTE = {
  PRIMARY: '#0170F0',
  WHITE: '#FFFFFF',
  RED: '#FF383C',
  TRANSPARENT: 'transparent',

  // Greys / neutrals
  GRAY_800: '#5E5E5E',
  COLOR_GRAY_100: '#F5F5F5',
  COLOR_GRAY_300: '#D8D8D8',
  COLOR_GRAY_400: '#BDBDBD',
  COLOR_GRAY_900: '#121212',

  // Text colors
  DARK_TEXT: '#222222',
  LIGHT_TEXT: '#FFFFFF',

  // Backgrounds
  COLOR_BACKGROUND_DARK: '#000000',

  // Alpha variants for light text
  COLOR_TEXT_LIGHT_ALPHA_0: 'rgba(255,255,255,0)',
  COLOR_TEXT_LIGHT_ALPHA_10: 'rgba(255,255,255,0.1)',
  COLOR_TEXT_LIGHT_ALPHA_50: 'rgba(255,255,255,0.5)',
};
export const LIGHT_THEME = {
  mode: 'light',
  statusBarStyle: 'dark-content',
  colors: {
    background: '#FFFFFF',
    primary: '#0170F0',
    text_primary: '#222222',
    grey: '#5E5E5E',
    dark_grey: '#7a7a7a',
    text_secondary: '#ffffff',
    border: '#D8D8D8',
    error: '#FF383C',
    disabled: '#E6E6E6',
    placeholder_text: '#cccccc',
  },
};
export const DARK_THEME = {
  mode: 'dark',
  statusBarStyle: 'light-content',
  colors: {
    background: '#000000',
    primary: '#FFFFFF',
    text_primary: '#FFFFFF',
    grey: '#ffffff',
    dark_grey: '#7a7a7a',
    text_secondary: '#000000',
    border: '#D8D8D8',
    error: '#FF383C',
    disabled: '#E6E6E6',
    placeholder_text: '#cccccc',
  },
};

export const themes = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};
