import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';
import { StyleSheet } from 'react-native-unistyles';
import useThemeColors from '../hooks/useThemeColors';

type AppButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  text?: string;
  activeOpacity?: number;
  loaderSize?: 'small' | 'large';
  btnStyle?: object;
  btnTextStyle?: object;
  rightComp?: React.ReactNode;
  danger?: boolean;
  modal?: boolean;
  outline?: boolean;
  outlinePrimary?: boolean;
  transparent?: boolean;
  light?: boolean;
  leftComp?: React.ReactNode;
  children?: React.ReactNode;
};

const AppButton: React.FC<AppButtonProps> = ({
  disabled = false,
  isLoading = false,
  onPress = () => {},
  text = 'title',
  loaderSize = 'small',
  btnStyle = {},
  btnTextStyle = {},
  activeOpacity,
  rightComp,
  danger,
  modal,
  outline,
  outlinePrimary,
  transparent,
  light,
  leftComp,
  children,
}) => {
  const { BUTTON_STYLES, isDarkMode } = useThemeColors();
  const STYLES = BUTTON_STYLES;
  const styleConfig = useMemo(() => {
    if (disabled) {
      return BUTTON_STYLES.DISABLED;
    } else if (danger) {
      return STYLES.DANGER;
    } else if (modal) {
      return STYLES.MODAL;
    } else if (outline) {
      return STYLES.OUTLINE;
    } else if (outlinePrimary) {
      return STYLES.OUTLINE_PRIMARY;
    } else if (transparent) {
      return STYLES.TRANSPARENT_OUTLINE;
    } else if (light) {
      return STYLES.LIGHT;
    }
    return STYLES.PRIMARY;
  }, [
    BUTTON_STYLES,
    danger,
    disabled,
    light,
    modal,
    outline,
    outlinePrimary,
    transparent,
    STYLES,
  ]);

  const buttonContainerStyle = useMemo(
    () => [
      styles.button,
      {
        backgroundColor: styleConfig?.backgroundColor,
        borderColor: styleConfig?.borderColor,
      },
    ],
    [styleConfig],
  );

  const textStyle = useMemo(
    () => [styles.buttonText, { color: styleConfig?.textColor }, btnTextStyle],
    [styleConfig.textColor, btnTextStyle],
  );
  return (
    <Pressable
      disabled={disabled || isLoading}
      onPress={onPress}
      style={({ pressed }) => [
        ...buttonContainerStyle,
        btnStyle,
        { opacity: pressed ? activeOpacity : 1 },
      ]}
    >
      {leftComp}
      {children || (
        <>
          {!isLoading && <Text style={textStyle}>{text}</Text>}
          {isLoading && (
            <ActivityIndicator
              size={loaderSize as 'small' | 'large'}
              color={isDarkMode ? '#fff' : '#000'}
            />
          )}
        </>
      )}
      {rightComp && rightComp}
    </Pressable>
  );
};

export default React.memo(AppButton);

const styles = StyleSheet.create(theme => ({
  button: {
    // backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 12,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    flexDirection: 'row',
    gap: 6,
  },

  buttonText: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  },
}));
