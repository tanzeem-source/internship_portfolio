import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import React from 'react';
import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';
import AppText from './AppText';

export interface InputProps {
  title?: string;
  onChangeText?: (e: any) => void;
  value?: string;
  inputStyle?: object;
  required?: boolean;
  containerStyle?: object;
  titleStyle?: object;
  error?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}
const AppInput = ({
  title,
  onChangeText,
  value,
  inputStyle,
  required,
  containerStyle,
  titleStyle,
  error,
  placeholder,
  keyboardType,
  ...props
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <AppText style={[styles.title, titleStyle]}>
          {title}
          <AppText style={styles.required}>{required ? '*' : ''}</AppText>
        </AppText>
      )}
      <TextInput
        style={[styles.input, [!title ? { marginTop: 14 } : {}], inputStyle]}
        onChangeText={onChangeText}
        value={value}
        placeholder={title || placeholder}
        placeholderTextColor={'#7A7A7A'}
        keyboardType={keyboardType || 'default'}
        {...props}
      />
      {error ? <AppText style={styles.required}>{error}</AppText> : null}
    </View>
  );
};

export default React.memo(AppInput);

const styles = StyleSheet.create(theme => ({
  container: {
    // marginTop: 12,
  },
  title: {
    color: theme.colors.text_primary,
    fontSize: 14 / fontScale,
    fontWeight: '500',
    marginVertical: 12,
  },
  input: {
    borderColor: theme.colors.border,
    borderWidth: 0.5,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    includeFontPadding: false,
    fontSize: 12 / fontScale,
    fontWeight: '400',
    fontFamily: FONTS.SF_PRO_ROUNDED,
  },
  required: {
    color: theme.colors.error,
    fontSize: 12 / fontScale,
    marginTop: 4,
    left: 6,
  },
}));
