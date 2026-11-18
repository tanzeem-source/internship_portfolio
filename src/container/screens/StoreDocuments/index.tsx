import { Image, Pressable, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppText';
import BackIcon from '../../../assets/Svg/back.svg';
import { StyleSheet } from 'react-native-unistyles';
import { fontScale } from '../../utilities/Utils';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const StoreDocuments = () => {
  const navigation = useNavigation();
  let loginScheme = yup.object().shape({
    pan_number: yup.string().required('PAN is required'),
    gstin: yup.string(),
    ifsc_code: yup.string().required('IFSC Code is required'),
    account_number: yup.string().required('Account number is required'),
    fssai_number: yup.string().required('FSSAI number is required'),
  });
  const {
    handleSubmit,
    values,
    setValues,
    setFieldValue,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      pan_number: '',
      gstin: '',
      ifsc_code: '',
      account_number: '',
      fssai_number: '',
    },
    validationSchema: loginScheme,
    onSubmit: (values: {
      pan_number: string;
      gstin: string;
      ifsc_code: string;
      account_number: string;
      fssai_number: string;
    }) => {
      console.log('heheh', JSON.stringify(values, null, 2));
      // @ts-ignore
    },
  });
  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#E0EDFC', '#FFFFFF']}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <BackIcon width={20} height={20} />
          </Pressable>
          <View style={styles.headerContainer}>
            <View style={styles.headerInnerCon}>
              <AppText style={styles.title}>Store Documents</AppText>
              <AppText style={styles.subTitle}>
                Fill out your store information below
              </AppText>
            </View>
            <Image
              source={require('../../../assets/Images/Storedoc.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          {/* PAN GSTIN */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>
              Enter PAN & GSTIN details
            </AppText>
            <AppInput
              value={values.pan_number}
              onChangeText={(text: string) =>
                setValues({ ...values, pan_number: text })
              }
              error={
                touched.pan_number && errors.pan_number
                  ? errors.pan_number
                  : undefined
              }
              placeholder="Business/Owner PAN*"
            />
            <AppInput
              value={values.gstin}
              onChangeText={(text: string) =>
                setValues({ ...values, gstin: text })
              }
              error={touched.gstin && errors.gstin ? errors.gstin : undefined}
              placeholder="GSTIN"
            />
          </View>
          {/* BANK DETAILS */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Official Bank Details</AppText>
            <AppText style={styles.headerSubtitle}>
              Payments from Buraq will be credited here
            </AppText>
            <AppInput
              value={values.ifsc_code}
              onChangeText={(text: string) =>
                setValues({ ...values, ifsc_code: text })
              }
              error={
                touched.ifsc_code && errors.ifsc_code
                  ? errors.ifsc_code
                  : undefined
              }
              placeholder="Bank IFSC code*"
            />
            <AppInput
              value={values.account_number}
              onChangeText={(text: string) =>
                setValues({ ...values, account_number: text })
              }
              error={
                touched.account_number && errors.account_number
                  ? errors.account_number
                  : undefined
              }
              placeholder="Bank Account number*"
            />
          </View>
          {/* <View style={styles.separator} /> */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>FSSAI Certificate</AppText>
            <AppText style={[styles.headerSubtitle, { marginLeft: 10 }]}>
              The FSSAI certificate should either{' '}
              <AppText style={{ fontWeight: '600' }}>match the name </AppText>{' '}
              of the restaurant or the owner. {`\n`}The address on FSSAI
              certificate should{' '}
              <AppText style={{ fontWeight: '600' }}>
                {' '}
                match the address
              </AppText>{' '}
              of the restaurant. {`\n`}The FSSAI certificate{' '}
              <AppText style={{ fontWeight: '600' }}>
                should not be expiring{' '}
              </AppText>
              before 30 days.
            </AppText>
            <View style={styles.separator} />
            <AppInput
              value={values.fssai_number}
              onChangeText={(text: string) =>
                setValues({ ...values, fssai_number: text })
              }
              error={
                touched.fssai_number && errors.fssai_number
                  ? errors.fssai_number
                  : undefined
              }
              placeholder="FSSAI certificate number*"
            />
            <AppText style={[styles.headerSubtitle, { marginTop: 12 }]}>
              FSSAI certificate unavailable/ expired?{' '}
              <AppText style={{ fontWeight: '600' }} onPress={() => {}}>
                Click here
              </AppText>
            </AppText>
          </View>
          <AppButton
            text="Proceed"
            // disabled={isValid}
            // onPress={handleSubmit}
            onPress={() => {
              navigation.navigate('PartnerContract');
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default StoreDocuments;

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 22,
  },
  backBtn: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    alignSelf: 'flex-start',
    left: 18,
    top: 12,
    padding: 14,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInnerCon: {
    marginLeft: 20,
    marginTop: 50,
    gap: 6,
  },
  title: {
    fontSize: 20 / fontScale,
    fontWeight: '600',
    color: '#222',
  },
  subTitle: {
    fontSize: 12 / fontScale,
    fontWeight: '400',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 22,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: 16 / fontScale,
    fontWeight: '600',
    color: theme.colors.grey,
  },
  headerSubtitle: {
    color: theme.colors.dark_grey,
    fontSize: 12 / fontScale,
    fontWeight: '400',
    marginTop: 4,
  },
  separator: {
    textDecorationStyle: 'dashed',
    height: 1,
    marginTop: 22,
    marginBottom: 6,
    backgroundColor: theme.colors.border,
  },
}));
