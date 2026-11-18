import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';
import { StyleSheet } from 'react-native-unistyles';
import AppText from './AppText';

type Props = {
  country: any;
  phone: string;
  onChangePhone: (val: string) => void;
  onPressCountry: () => void;
  error: any;
  containerStyle?: object;
  inputStyle?: object;
  codeStyle?: object;
  placeholderTextColor?: string;
};

const PhoneInputBox = ({
  country,
  phone,
  onChangePhone,
  onPressCountry,
  error,
  containerStyle,
  inputStyle,
  codeStyle,
  placeholderTextColor,
}: Props) => {
  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        <Pressable onPress={onPressCountry} style={styles.codeBox}>
          <AppText style={[styles.codeText, codeStyle]}>
            +{country.callingCode}
          </AppText>
        </Pressable>

        <TextInput
          placeholder="Enter mobile number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={onChangePhone}
          style={[styles.input, inputStyle]}
          returnKeyType="done"
          placeholderTextColor={placeholderTextColor || '#ccc'}
        />
      </View>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </View>
  );
};

export default PhoneInputBox;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    height: 51,
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  codeBox: {
    paddingHorizontal: 12,
  },
  codeText: {
    fontSize: 16 / fontScale,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16 / fontScale,
  },
  error: {
    color: theme.colors.error,
    fontSize: 12 / fontScale,
  },
}));
