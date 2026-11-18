import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import ScreenWrapper from '../../components/ScreenWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '../../../assets/Svg/back.svg';
import AppText from '../../components/AppText';
import { DEVICE_HEIGHT, DEVICE_WIDTH, fontScale } from '../../utilities/Utils';
import { useNavigation } from '@react-navigation/native';
import AppInput from '../../components/AppInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PhotoSvg from '../../../assets/svgComp/PhotoSvg';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import AppButton from '../../components/AppButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FONTS } from '../../../constants/common.constants';
import Config from "react-native-config";

const StoreLocation = () => {
  const navigation = useNavigation();
  let loginScheme = yup.object().shape({
    shop_number: yup.string().required('Shop Number is required'),
    floor: yup.string().required('Floor is required'),
    building_name: yup.string().required('Building Name is required'),
    pincode: yup.number().required('Pincode is required'),
    address: yup.string().required('Address is required'),
    landmark: yup.string(),
    res_images: yup.array(),
  });
console.log("configgg", Config.GOOGLE_MAPS_API_KEY)
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
      shop_number: '',
      floor: '',
      building_name: '',
      pincode: 0,
      address: '',
      landmark: '',
      res_images: [] as Asset[],
    },
    validationSchema: loginScheme,
    onSubmit: (values: {
      shop_number: string;
      floor: string;
      building_name: string;
      pincode: number;
      address: string;
      landmark: string;
      res_images: Asset[];
    }) => {
      const formData = new FormData();
      formData.append('shop_number', values.shop_number);
      formData.append('floor', values.floor);
      formData.append('building_name', values.building_name);
      formData.append('pincode', String(values.pincode));
      formData.append('landmark', values.landmark);

      values.res_images?.forEach((asset, index) => {
        if (!asset?.uri) return;
        formData.append('res_images[]', {
          uri: asset.uri,
          type: asset.type ?? 'image/jpeg',
          name: asset.fileName ?? `restaurant_${index}.jpg`,
        } as any);
      });

      console.log('FORM_VALUES', JSON.stringify(values, null, 2));
      console.log('FORMDATA_IMAGES_COUNT', values.res_images?.length ?? 0);
      // @ts-ignore
    },
  });
  const handleSelectImages = async () => {
    let options = {
      selectionLimit: 5,
      maxWidth: 1080,
      maxHeight: 1080,
      mediaType: 'photo',
    };
    const res = await launchImageLibrary(options as any);
    const assets = (res as any)?.assets as Asset[] | undefined;
    if (assets?.length) {
      setFieldValue('res_images', assets);
    } else {
      setFieldValue('res_images', []);
    }
  };
  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#E0EDFC', '#FFFFFF']}
          style={{ position: 'absolute', height: DEVICE_HEIGHT / 2 }}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <BackIcon width={20} height={20} />
            </Pressable>
            <AppText style={styles.title}>Add Store Location</AppText>
            <View style={{ width: 20 }} />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Address Details</AppText>
            <AppText style={styles.headerSubtitle}>
              Provide accurate details to ensure timely delivery of food to your
              customers.
            </AppText>
            <View style={styles.plotCon}>
              <AppInput
                containerStyle={styles.plotNo}
                value={values?.shop_number}
                onChangeText={e => setValues({ ...values, shop_number: e })}
                placeholder="Shop/Plot Number*"
                error={
                  touched.shop_number && errors.shop_number
                    ? errors.shop_number
                    : undefined
                }
              />
              <AppInput
                containerStyle={styles.floor}
                value={values?.floor}
                onChangeText={e => setValues({ ...values, floor: e })}
                placeholder="Floor*"
                error={touched.floor && errors.floor ? errors.floor : undefined}
              />
            </View>
            <AppInput
              value={values?.building_name}
              onChangeText={e => setValues({ ...values, building_name: e })}
              placeholder="Building/Mall/Complex Name*"
              error={
                touched.building_name && errors.building_name
                  ? errors.building_name
                  : undefined
              }
            />
            <AppInput
              value={values?.pincode?.toString()}
              onChangeText={e =>
                setValues({ ...values, pincode: Number(e) || 0 })
              }
              placeholder="Pincode*"
              keyboardType="number-pad"
              error={
                touched.pincode && errors.pincode ? errors.pincode : undefined
              }
            />
          </View>
          {/* <View style={styles.infoContainer}>

          </View> */}
          {/* <AppInput
          value={values?.address}
              onChangeText={e => setValues({ ...values, address: e })}
              placeholder="Address*"
              error={
                touched.address && errors.address
                  ? errors.address
                  : undefined
              }
          /> */}
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: Config.GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            fetchDetails={true}
           textInputProps={{
        placeholder: 'Search address',
        style: {
          borderColor: '#D8D8D8',
          borderWidth: 0.5,
          borderRadius: 12,
          paddingVertical: 16,
          paddingHorizontal: 12,
          width: '100%',
          includeFontPadding: false,
          fontSize: 12 / fontScale,
          fontWeight: '400',
          fontFamily: FONTS.SF_PRO_ROUNDED,
        },
      }}
      enablePoweredByContainer={false}
          />
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Additional Information</AppText>
            <AppText style={styles.headerSubtitle}>
              To further avoid delays and cancellations help delivery partners
              reach you easily with this info
            </AppText>
            <AppInput
              value={values?.landmark}
              onChangeText={e => setValues({ ...values, landmark: e })}
              placeholder="Landmark*"
              error={
                touched.landmark && errors.landmark
                  ? errors.landmark
                  : undefined
              }
            />
            <TouchableOpacity
              style={styles.photoCon}
              activeOpacity={0.8}
              onPress={handleSelectImages}
            >
              <AppText style={styles.photoTitle}>
                Add photos of restaurant front
              </AppText>
              <PhotoSvg />
            </TouchableOpacity>
          </View>
          <AppButton
            text="Proceed"
            onPress={() => navigation.navigate('StoreDocuments')}
            // onPress={handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default StoreLocation;

const styles = StyleSheet.create(theme => ({
  header: {
    width: DEVICE_WIDTH / 1,
    height: DEVICE_HEIGHT / 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  backBtn: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    alignSelf: 'flex-start',
    top: 12,
    padding: 14,
  },
  title: {
    fontSize: 20 / fontScale,
    alignSelf: 'center',
    color: theme.colors.text_primary,
    fontWeight: '600',
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 22,
    marginTop: 80,
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
  plotCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  plotNo: {
    width: DEVICE_WIDTH / 2,
  },
  floor: {
    width: DEVICE_WIDTH / 3.3,
  },
  photoCon: {
    borderColor: theme.colors.border,
    borderWidth: 0.5,
    marginTop: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F7FF',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  photoTitle: {
    fontSize: 12 / fontScale,
    fontWeight: '500',
    color: theme.colors.primary,
    alignSelf: 'center',
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
}));
