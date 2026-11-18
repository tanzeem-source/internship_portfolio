import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import React, { useEffect, useState } from 'react';
import { DEVICE_HEIGHT, DEVICE_WIDTH, fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import BackIcon from '../../../assets/Svg/back.svg';
import { useRoute } from '@react-navigation/native';
import { OtpInput } from 'react-native-otp-entry';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';

const OtpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const phone = route.params?.phone ?? '';
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    if (counter <= 0) return;
    const timer = setInterval(() => setCounter(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const resendOtp = () => {
    // TODO: call your resend OTP API here, e.g. resendOtpApi(phone)
    setCounter(30);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <BackIcon width={20} height={20} />
          </Pressable>

          <AppText style={styles.title}>OTP Verification</AppText>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.middleContainer}>
          <AppText style={styles.infoText}>
            We have sent a verification code to
          </AppText>
          <AppText style={styles.phoneText}>{phone}</AppText>
        </View>

        <OtpInput
          numberOfDigits={4}
          type="numeric"
          autoFocus
          focusColor="#0170F0"
          onTextChange={setOtp}
          onFilled={text => console.log('OTP:', text)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
          }}
        />
        <View style={styles.bottomContainer}>
          <Pressable
            onPress={resendOtp}
            disabled={counter > 0}
            style={({ pressed }) => [
              counter > 0 && styles.resendDisabled,
              pressed && counter === 0 && styles.resendPressed,
            ]}
          >
            <AppText
              style={[
                styles.resendText,
                counter > 0 && styles.resendTextDisabled,
              ]}
            >
              {counter > 0 ? `Resend OTP in ${counter}s` : 'Resend OTP'}
            </AppText>
          </Pressable>

          <AppButton
            text="Verify and Proceed"
            onPress={() => navigation.navigate('Stepper')}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OtpVerification;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },

  header: {
    width: DEVICE_WIDTH / 1,
    height: DEVICE_HEIGHT / 12,
    backgroundColor: '#E0EDFC',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  backBtn: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },

  title: {
    fontSize: 16 / fontScale,
    alignSelf: 'center',
    color: '#333',
  },

  middleContainer: {
    alignItems: 'center',
    marginHorizontal: 75,
    marginTop: 50,
    marginBottom: 30,
  },

  infoText: {
    fontSize: 14 / fontScale,
    color: theme.colors.grey,
    marginBottom: 3,
  },

  phoneText: {
    fontSize: 15 / fontScale,
    color: theme.colors.text_primary,
  },

  otpContainer: {
    marginTop: 0,
    width: 'auto', //  THIS IS THE FIX
    alignSelf: 'center', // keeps it centered
  },

  otpBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderColor: '#AFAFAF',
    marginHorizontal: 6, // control gap
    borderWidth: 0.8,
  },

  otpText: {
    fontSize: 18 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#000',
    textAlign: 'center',
  },

  bottomContainer: {
    marginHorizontal: 24,
  },

  resendText: {
    marginTop: 20,
    fontSize: 14 / fontScale,
    color: '#2F9C4D',
    textAlign: 'center',
  },
  resendTextDisabled: {
    color: '#9E9E9E',
  },
  resendDisabled: {
    opacity: 0.7,
  },
  resendPressed: {
    opacity: 0.8,
  },

  verifyBtn: {
    marginTop: 30,
    height: DEVICE_HEIGHT / 15,
    backgroundColor: '#0170F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  verifyText: {
    color: '#fff',
    fontSize: 16 / fontScale,
  },
}));
