import { PALETTE } from '../../constants/theme.constants';
import { useUnistyles } from 'react-native-unistyles';

/**
 * Hook to get current theme colors from unistyles.
 * Reactive - will trigger re-render when theme changes.
 *
 * @returns {Object} Current theme colors object
 *
 * @example
 * const colors = useThemeColors();
 * <BackSvg fill={colors.textPrimary} />
 */

const LIGHT_MODE_BUTTON_STYLES = {
  PRIMARY: {
    backgroundColor: PALETTE.PRIMARY,
    borderColor: PALETTE.PRIMARY,
    textColor: PALETTE.WHITE,
    loaderColor: PALETTE.WHITE,
  },
  DANGER: {
    backgroundColor: PALETTE.RED,
    borderColor: PALETTE.RED,
    textColor: PALETTE.WHITE,
    loaderColor: PALETTE.WHITE,
  },
  OUTLINE_PRIMARY: {
    backgroundColor: PALETTE.WHITE,
    borderColor: PALETTE.PRIMARY,
    textColor: PALETTE.PRIMARY,
    loaderColor: PALETTE.PRIMARY,
  },
  TRANSPARENT_OUTLINE: {
    backgroundColor: PALETTE.TRANSPARENT,
    borderColor: PALETTE.PRIMARY,
    textColor: PALETTE.PRIMARY,
    loaderColor: PALETTE.PRIMARY,
  },
  OUTLINE: {
    backgroundColor: PALETTE.WHITE,
    borderColor: PALETTE.COLOR_GRAY_300,
    textColor: PALETTE.PRIMARY,
    loaderColor: PALETTE.GRAY_800,
  },
  MODAL: {
    backgroundColor: PALETTE.WHITE,
    borderColor: PALETTE.GRAY_800,
    textColor: PALETTE.GRAY_800,
    loaderColor: PALETTE.GRAY_800,
  },
  LIGHT: {
    backgroundColor: PALETTE.COLOR_GRAY_100,
    borderColor: PALETTE.COLOR_GRAY_100,
    textColor: PALETTE.DARK_TEXT,
    loaderColor: PALETTE.DARK_TEXT,
  },
  DISABLED: {
    backgroundColor: PALETTE.COLOR_GRAY_400,
    borderColor: PALETTE.COLOR_GRAY_400,
    textColor: PALETTE.GRAY_800,
    loaderColor: PALETTE.WHITE,
  },
};
const DARK_MODE_BUTTON_STYLES = {
  PRIMARY: {
    backgroundColor: PALETTE.LIGHT_TEXT,
    borderColor: PALETTE.LIGHT_TEXT,
    textColor: PALETTE.COLOR_BACKGROUND_DARK,
    loaderColor: PALETTE.COLOR_BACKGROUND_DARK,
  },
  OUTLINE_PRIMARY: {
    backgroundColor: PALETTE.COLOR_BACKGROUND_DARK,
    borderColor: PALETTE.LIGHT_TEXT,
    textColor: PALETTE.LIGHT_TEXT,
    loaderColor: PALETTE.LIGHT_TEXT,
  },
  TRANSPARENT_OUTLINE: {
    backgroundColor: PALETTE.TRANSPARENT,
    borderColor: PALETTE.LIGHT_TEXT,
    textColor: PALETTE.LIGHT_TEXT,
    loaderColor: PALETTE.LIGHT_TEXT,
  },
  DANGER: {
    backgroundColor: PALETTE.WHITE,
    borderColor: PALETTE.GRAY_800,
    textColor: PALETTE.DARK_TEXT,
    loaderColor: PALETTE.GRAY_800,
  },
  OUTLINE: {
    backgroundColor: PALETTE.COLOR_BACKGROUND_DARK,
    borderColor: PALETTE.COLOR_GRAY_300,
    textColor: PALETTE.PRIMARY,
    loaderColor: PALETTE.LIGHT_TEXT,
  },
  MODAL: {
    backgroundColor: PALETTE.COLOR_GRAY_900,
    borderColor: PALETTE.COLOR_GRAY_300,
    textColor: PALETTE.LIGHT_TEXT,
    loaderColor: PALETTE.LIGHT_TEXT,
  },
  LIGHT: {
    backgroundColor: PALETTE.COLOR_TEXT_LIGHT_ALPHA_10,
    borderColor: PALETTE.COLOR_TEXT_LIGHT_ALPHA_0,
    textColor: PALETTE.LIGHT_TEXT,
    loaderColor: PALETTE.LIGHT_TEXT,
  },

  DISABLED: {
    backgroundColor: PALETTE.COLOR_TEXT_LIGHT_ALPHA_50,
    borderColor: PALETTE.COLOR_TEXT_LIGHT_ALPHA_0,
    textColor: PALETTE.COLOR_BACKGROUND_DARK,
    loaderColor: PALETTE.COLOR_BACKGROUND_DARK,
  },
};

const useThemeColors = () => {
  const { theme } = useUnistyles();
  const isDarkMode = theme.mode === 'dark';
  const BUTTON_STYLES = isDarkMode
    ? DARK_MODE_BUTTON_STYLES
    : LIGHT_MODE_BUTTON_STYLES;
  return { theme, isDarkMode, BUTTON_STYLES };
};

export default useThemeColors;
