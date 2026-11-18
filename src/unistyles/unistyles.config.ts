import {StyleSheet} from 'react-native-unistyles';
import { DARK_THEME, LIGHT_THEME } from '../constants/theme.constants';

type AppTheme = {
    light: typeof LIGHT_THEME
    dark: typeof DARK_THEME
}

declare module 'react-native-unistyles' {
   export interface UnistylesThemes extends AppTheme {}
}

StyleSheet.configure({
    themes: {
        light: LIGHT_THEME,
        dark: DARK_THEME,
    },
    settings: {
        adaptiveThemes: false,
        initialTheme: 'light',
    },
});

export default StyleSheet;