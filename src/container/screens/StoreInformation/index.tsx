import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '../../../assets/Svg/back.svg';
import { useNavigation } from '@react-navigation/native';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';
import AppInput from '../../components/AppInput';
import { StyleSheet } from 'react-native-unistyles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ArrowRight from '../../../assets/svgComp/ArrowRight';
import PhoneInputBox from '../../components/PhoneInputBox';
import RadioGroup from 'react-native-radio-buttons-group';
import { LIGHT_THEME, PALETTE } from '../../../constants/theme.constants';
import AppCheckbox from '../../components/AppCheckbox';
import ClockSvg from '../../../assets/svgComp/ClockSvg';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppModal from '../../components/AppModal';

const country = {
  name: 'India',
  code: 'IN',
  callingCode: '91',
};
const week_days = {
  monday: true,
  friday: true,
  tuesday: true,
  saturday: true,
  wednesday: true,
  sunday: true,
  thursday: true,
};
const workingDaysKeys = Object.keys(week_days) as Array<keyof typeof week_days>;
const radioButtons = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'My WhatsApp number is same as above',
    value: '1',
    size: 18,
    color: PALETTE.PRIMARY,
    borderColor: LIGHT_THEME.colors.text_primary,
  },
  {
    id: '2',
    label: 'I have a different WhatsApp number',
    value: '2',
    size: 18,
    color: PALETTE.PRIMARY,
    borderColor: LIGHT_THEME.colors.text_primary,
  },
];
const opencloseButtons = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label:
      'I open and close my restaurant at the same time on all working days',
    value: '1',
    size: 18,
    color: PALETTE.PRIMARY,
    borderColor: LIGHT_THEME.colors.text_primary,
    containerStyle: {
      alignItems: 'flex-start' as const,
    },
  },
  {
    id: '2',
    label: 'I’ve separate daywise timings',
    value: '2',
    size: 18,
    color: PALETTE.PRIMARY,
    borderColor: LIGHT_THEME.colors.text_primary,
    containerStyle: {
      alignItems: 'flex-start' as const,
    },
  },
];
const StoreInformation = () => {
  const navigation = useNavigation();
  const [timePickerTarget, setTimePickerTarget] = useState<
    'open' | 'close' | null
  >(null);
  const [openTime, setOpenTime] = useState(() => new Date());
  const [closeTime, setCloseTime] = useState(() => new Date());

  const formatTime = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    return (date: Date) => formatter.format(date);
  }, []);
  const workingDaysSchema = yup
    .object()
    .shape(
      workingDaysKeys.reduce((acc, key) => {
        acc[key] = yup.boolean().required();
        return acc;
      }, {} as Record<string, yup.BooleanSchema<boolean>>),
    )
    .required('Working days required')
    .test('at-least-one-day', 'Select at least one working day', value =>
      Boolean(value && Object.values(value).some(Boolean)),
    );

  let loginScheme = yup.object().shape({
    owner_name: yup.string().required('Owner name is required'),
    store_name: yup.string().required('Store name is required'),
    email_address: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    mobile_number: yup.string().required('Phone is required'),
    is_whatsapp: yup.string().required('Whatsapp is required'),
    whats_app_number: yup.string().when('is_whatsapp', {
      is: (val: string) => val === '2',
      then: schema =>
        schema.required('Whats app number is required when option 2 selected'),
      otherwise: schema => schema.notRequired(),
    }),
    working_days: workingDaysSchema,
    open_close: yup.string().required('Time is required'),
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
      owner_name: '',
      store_name: '',
      email_address: '',
      mobile_number: '',
      is_whatsapp: '',
      whats_app_number: '',
      working_days: week_days,
      open_close: '',
    },
    validationSchema: loginScheme,
    onSubmit: (values: {
      owner_name: string;
      store_name: string;
      email_address: string;
      mobile_number: string;
      is_whatsapp: string;
      whats_app_number: string;
      working_days: typeof week_days;
      open_close: string;
    }) => {
      console.log('heheh', JSON.stringify(values, null, 2));
      // @ts-ignore
    },
  });
  const handleStoreLocation = async () => {
    navigation.navigate('StoreLocation');
  };
  const handleSelectAllWorkingDays = () => {
    const allSelected = workingDaysKeys.every(
      day => values.working_days?.[day],
    );
    const next = workingDaysKeys.reduce((acc, day) => {
      acc[day] = !allSelected;
      return acc;
    }, {} as typeof week_days);
    setFieldValue('working_days', next);
  };
  const handleTimePress = (target: 'open' | 'close') =>
    setTimePickerTarget(target);
  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (!timePickerTarget) return;

    if (Platform.OS === 'android') {
      if (event?.type === 'set' && selectedDate) {
        if (timePickerTarget === 'open') setOpenTime(selectedDate);
        else setCloseTime(selectedDate);
      }
      setTimePickerTarget(null);
      return;
    }

    if (selectedDate) {
      if (timePickerTarget === 'open') setOpenTime(selectedDate);
      else setCloseTime(selectedDate);
    }
  };
  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#E0EDFC', '#FFFFFF']}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <BackIcon width={20} height={20} />
          </Pressable>
          <View style={styles.headerContainer}>
            <View style={styles.headerInnerCon}>
              <AppText style={styles.title}>Store Information</AppText>
              <AppText style={styles.subTitle}>
                Fill out your store information below
              </AppText>
            </View>
            <Image
              source={require('../../../assets/Images/StoreInfo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          {/* Basic Details */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Basic Details</AppText>
            <AppInput
              value={values.owner_name}
              onChangeText={(text: string) =>
                setValues({ ...values, owner_name: text })
              }
              error={
                touched.owner_name && errors.owner_name
                  ? errors.owner_name
                  : undefined
              }
              placeholder="Owner’s Full Name *"
            />
            <AppInput
              value={values.store_name}
              onChangeText={(text: string) =>
                setValues({ ...values, store_name: text })
              }
              error={
                touched.store_name && errors.store_name
                  ? errors.store_name
                  : undefined
              }
              placeholder="Store Name *"
            />
            <AppButton
              btnStyle={styles.locationCon}
              onPress={handleStoreLocation}
            >
              <AppText style={styles.locationText}>Add Store Location</AppText>
              <ArrowRight />
            </AppButton>
          </View>
          {/* Owner Details */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Owner Contact Details</AppText>
            <AppText style={styles.headerSubtitle}>
              To get updates on payments, customer complaints, order acceptance,
              etc.
            </AppText>
            <AppInput
              value={values.email_address}
              onChangeText={(text: string) =>
                setValues({ ...values, email_address: text })
              }
              error={
                touched.email_address && errors.email_address
                  ? errors.email_address
                  : undefined
              }
              placeholder="Email address *"
            />
            <PhoneInputBox
              country={country}
              phone={values?.mobile_number}
              onChangePhone={phone =>
                setValues({ ...values, mobile_number: phone })
              }
              onPressCountry={() => {}}
              error={touched.mobile_number && errors?.mobile_number}
              inputStyle={styles.inputCon}
              containerStyle={styles.con}
              codeStyle={styles.codeText}
              placeholderTextColor={'#7A7A7A'}
            />
            <View style={styles.separator} />
            <AppText
              style={[
                styles.headerSubtitle,
                { marginTop: 0, color: '#7A7A7A' },
              ]}
            >
              Provide your{' '}
              <AppText style={styles.whatsappText}>WhatsApp Number</AppText> to
              get insights on ratings, items, etc.
            </AppText>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={e => setValues({ ...values, is_whatsapp: e })}
              selectedId={values?.is_whatsapp}
              containerStyle={styles.radioBtnCon}
              labelStyle={styles.radioLabel}
            />
          </View>
          {/* Working days */}
          <View style={styles.infoContainer}>
            <View style={styles.workingDaysHeaderCon}>
              <AppText style={styles.headerTitle}>Working Days</AppText>
              <Pressable onPress={handleSelectAllWorkingDays} hitSlop={8}>
                <AppText style={styles.selectAll}>Select all</AppText>
              </Pressable>
            </View>
            <View style={styles.workingDaysGrid}>
              {workingDaysKeys.map(day => (
                <AppCheckbox
                  key={day}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                  checked={Boolean(values?.working_days?.[day])}
                  onChange={nextChecked =>
                    setFieldValue(`working_days.${day}`, nextChecked)
                  }
                  containerStyle={styles.workingDayItem}
                  labelStyle={styles.workingDayLabel}
                />
              ))}
            </View>
          </View>
          {/* Opening and closing time */}
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Opening & Closing Time</AppText>

            <RadioGroup
              radioButtons={opencloseButtons}
              onPress={e => setValues({ ...values, open_close: e })}
              selectedId={values?.open_close}
              containerStyle={styles.radioBtnCon}
              labelStyle={styles.radioLabel}
            />
            <View style={styles.separator} />

            <View style={styles.timeButtonsRow}>
              <Pressable
                style={styles.timeButton}
                onPress={() => handleTimePress('open')}
              >
                <ClockSvg />
                <AppText style={styles.timeButtonText}>
                  {formatTime(openTime)}
                </AppText>
              </Pressable>

              <Pressable
                style={styles.timeButton}
                onPress={() => handleTimePress('close')}
              >
                <ClockSvg />
                <AppText style={styles.timeButtonText}>
                  {formatTime(closeTime)}
                </AppText>
              </Pressable>
            </View>
          </View>

          <AppButton text="Proceed" disabled={isValid} onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
      <AppModal
        visible={!!timePickerTarget}
        onClose={() => setTimePickerTarget(null)}
        title={`Select ${timePickerTarget} time`}
        showClose={
          <TouchableOpacity onPress={() => setTimePickerTarget(null)}>
            <AppText>Close</AppText>
          </TouchableOpacity>
        }
      >
        {timePickerTarget && (
          <View style={styles.timePickerWrap}>
            <DateTimePicker
              mode="time"
              value={timePickerTarget === 'open' ? openTime : closeTime}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          </View>
        )}
      </AppModal>
    </ScreenWrapper>
  );
};

export default StoreInformation;

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
  phoneTitle: {
    color: theme.colors.text_primary,
    fontSize: 14 / fontScale,
    fontWeight: '500',
    marginVertical: 12,
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
  },
  headerTitle: {
    fontSize: 16 / fontScale,
    fontWeight: '600',
    color: theme.colors.grey,
  },
  headerSubtitle: {
    color: '#A1A1A1',
    fontSize: 12 / fontScale,
    fontWeight: '400',
    marginTop: 4,
  },
  locationCon: {
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    height: 48,
    borderColor: theme.colors.border,
  },
  locationText: {
    fontSize: 12 / fontScale,
    fontWeight: 500,
    color: theme.colors.primary,
  },
  inputCon: {
    fontSize: 12 / fontScale,
    paddingHorizontal: 0,
  },
  codeText: {
    fontSize: 12 / fontScale,
  },
  con: {
    backgroundColor: '#fff',
    marginTop: 14,
  },
  separator: {
    textDecorationStyle: 'dashed',
    height: 1,
    marginVertical: 22,
    backgroundColor: theme.colors.border,
  },
  whatsappText: {
    fontSize: 12 / fontScale,
    fontWeight: '400',
    color: theme.colors.grey,
  },
  radioBtnCon: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 16,
    marginLeft: -10,
  },
  radioLabel: {
    color: theme.colors.grey,
    fontSize: 12 / fontScale,
    fontWeight: '400',
    fontFamily: FONTS.SF_PRO_ROUNDED,
    letterSpacing: 0.5,
  },
  timeButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  timeButtonIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButtonIconHandShort: {
    position: 'absolute',
    width: 2,
    height: 5,
    backgroundColor: '#22C55E',
    borderRadius: 1,
    transform: [{ translateY: -1 }],
  },
  timeButtonIconHandLong: {
    position: 'absolute',
    width: 2,
    height: 7,
    backgroundColor: '#22C55E',
    borderRadius: 1,
    transform: [{ rotate: '60deg' }, { translateY: -2 }],
  },
  timeButtonText: {
    fontSize: 12 / fontScale,
    fontWeight: '400',
    color: theme.colors.dark_grey,
  },
  timePickerWrap: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  workingDaysHeaderCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectAll: {
    fontSize: 14 / fontScale,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  workingDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 22,
    rowGap: 16,
  },
  workingDayItem: {
    width: '50%',
    paddingRight: 10,
  },
  workingDayLabel: {
    fontSize: 14 / fontScale,
  },
}));
