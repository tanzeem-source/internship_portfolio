import React, { useMemo } from 'react';
import { Pressable, Text, View, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type AppCheckboxProps = {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: TextStyle;
};

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  containerStyle,
  checkboxStyle,
  labelStyle,
}) => {
  const pressHandler = useMemo(() => {
    if (disabled) return undefined;
    return () => onChange(!checked);
  }, [checked, disabled, onChange]);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={pressHandler}
      style={[styles.container, containerStyle, disabled && styles.disabled]}
      hitSlop={8}
    >
      <View
        style={[
          styles.box,
          checked && styles.boxChecked,
          disabled && styles.boxDisabled,
          checkboxStyle,
        ]}
      >
        {checked ? <View style={styles.tick} /> : null}
      </View>

      {label ? (
        <Text
          style={[styles.label, disabled && styles.labelDisabled, labelStyle]}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default React.memo(AppCheckbox);

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  boxDisabled: {
    borderColor: theme.colors.disabled,
    backgroundColor: theme.colors.disabled,
  },
  tick: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.colors.text_secondary,
    transform: [{ rotate: '-45deg' }],
  },
  label: {
    color: theme.colors.dark_grey,
    fontSize: 12,
    fontWeight: '500',
  },
  labelDisabled: {
    color: theme.colors.grey,
  },
}));
