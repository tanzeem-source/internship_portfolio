import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import ScreenWrapper from '../../components/ScreenWrapper';
import { FONTS } from '../../../constants/common.constants';
import { fontScale } from '../../utilities/Utils';

const Login = () => {
  return (
    <ScreenWrapper>
      <Text style={styles.text}>Login</Text>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create(theme => ({
  text: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: theme.colors.text,
  },
}));
