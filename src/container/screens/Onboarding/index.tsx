import React from 'react';
import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import ScreenWrapper from '../../components/ScreenWrapper';
import PhoneInputBox from '../../components/PhoneInputBox';

import { FONTS } from '../../../constants/common.constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH, fontScale } from '../../utilities/Utils';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';

const Onboarding = () => {
  const navigation = useNavigation();
  const country = {
    name: 'India',
    code: 'IN',
    callingCode: '91',
  };
  let loginScheme = yup.object().shape({
    phone: yup.string().required('Phone number is required').min(10).max(10),
  });

  const { handleSubmit, values, setValues, errors, touched } = useFormik({
    initialValues: {
      phone: '9748121112',
    },
    validationSchema: loginScheme,
    onSubmit: (values: { phone: string }) => {
      console.log(JSON.stringify(values, null, 2));
      // @ts-ignore
      navigation.navigate('OtpVerification', {
        phone: `+${country.callingCode}${values.phone}`,
      });
    },
  });

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/Images/onboarding.png')}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.centerContent}>
            <AppText style={styles.title}>Sell faster. Grow bigger.</AppText>
            <AppText style={styles.subtitle}>
              Take your shop from the street{'\n'}to the screen.
            </AppText>
          </View>

          <View style={styles.bottomContainer}>
            <AppText style={styles.loginText}>Log In or Sign Up</AppText>
            <PhoneInputBox
              country={country}
              phone={values?.phone}
              onChangePhone={phone => setValues({ phone })}
              onPressCountry={() => {}}
              error={touched.phone && errors?.phone}
            />
            <AppButton text="Continue" onPress={handleSubmit} />
          </View>

          <AppText style={styles.footer}>
            By continuing you agree to our{' '}
            <AppText style={styles.link}>Terms of Service</AppText> &{' '}
            <AppText style={styles.link}>Privacy Policy</AppText>
          </AppText>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },

  image: {
    width: DEVICE_WIDTH / 1,
    height: DEVICE_HEIGHT / 1.9,
  },

  centerContent: {
    alignItems: 'center',
    paddingTop: 24,
  },

  title: {
    fontSize: 20 / fontScale,
  },

  subtitle: {
    fontSize: 14 / fontScale,
    color: '#595959',
    textAlign: 'center',
    marginTop: 8,
  },

  bottomContainer: {
    padding: 24,
  },

  loginText: {
    marginBottom: 6,
    fontSize: 16 / fontScale,
    color: '#5e5e5e',
  },

  footer: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 10 / fontScale,
    color: '#777',
  },

  link: {
    fontSize: 10 / fontScale,
    color: '#0170F0',
  },
}));
