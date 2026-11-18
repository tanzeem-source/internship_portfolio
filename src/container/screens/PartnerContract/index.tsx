import { Alert, Image, PermissionsAndroid, Platform, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../../assets/Svg/back.svg';
import { DEVICE_HEIGHT, fontScale } from '../../utilities/Utils';
import { StyleSheet } from 'react-native-unistyles';
import AppCheckbox from '../../components/AppCheckbox';
import AppButton from '../../components/AppButton';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import DownloadSvg from '../../../assets/svgComp/DownloadSvg';

const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
const PartnerContract = () => {
  const navigation = useNavigation();
  const [terms, setTerms] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const downloadPdf = async () => {
    if (downloading) return;

    const fileName = 'contract.pdf';
    let destinationPath = '';

    try {
      setDownloading(true);

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs permission to save the file to your device',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Unable to save file without storage permission.');
          return;
        }

        destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      } else {
        const downloadsDir = `${RNFS.DocumentDirectoryPath}/Downloads`;
        if (!(await RNFS.exists(downloadsDir))) {
          await RNFS.mkdir(downloadsDir);
        }
        destinationPath = `${downloadsDir}/${fileName}`;
      }

      const download = RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: destinationPath,
      });

      const result = await download.promise;
      if (result.statusCode === 200) {
        Alert.alert('Download complete', `Saved to ${destinationPath}`);
      } else {
        throw new Error(`Download failed (status ${result.statusCode})`);
      }
    } catch (error: any) {
      console.error('PDF download error', error);
      Alert.alert('Download failed', error?.message ?? String(error));
    } finally {
      setDownloading(false);
    }
  };

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#E0EDFC', '#FFFFFF']}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <BackIcon width={20} height={20} />
          </Pressable>
          <View style={styles.headerContainer}>
            <View style={styles.headerInnerCon}>
              <AppText style={styles.title}>Partner Contract</AppText>
              <AppText style={styles.subTitle}>
                Please review the contract given below
              </AppText>
            </View>
            <Image
              source={require('../../../assets/Images/contract.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <AppText style={styles.headerTitle}>Overview</AppText>
            <View style={styles.comissionCon}>
              <AppText style={styles.comissionText}>Buraq Commission</AppText>
              <AppText style={styles.comissionPer}>24%</AppText>
            </View>
          </View>
            <View style={styles.infoContainer}>
              <Pressable onPress={downloadPdf} style={styles.downloadIcon}>
              <DownloadSvg fill={downloading ? '#999' : '#222'} />
            </Pressable>
              <WebView
                source={{ uri: viewerUrl }}
                style={{ height: DEVICE_HEIGHT * 0.55 }}
              />
            </View>
          <View style={styles.infoContainer}>
            <AppCheckbox
              label={'I have read & accept all the terms and conditions'}
              checked={terms}
              onChange={nextChecked => setTerms(nextChecked)}
              containerStyle={{ marginTop: 8 }}
              labelStyle={styles.workingDayLabel}
            />
          </View>
          <AppButton text="Proceed" disabled={!terms} onPress={() => {}} />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default PartnerContract;

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
  comissionCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  comissionText: {
    fontWeight: '400',
    color: theme.colors.text_primary,
    fontSize: 14 / fontScale,
  },
  comissionPer: {
    fontWeight: '600',
    color: theme.colors.text_primary,
    fontSize: 12 / fontScale,
  },
  workingDayLabel: {
    fontSize: 12 / fontScale,
    color: theme.colors.text_primary,
  },
  downloadIcon:{
    position: 'absolute',
    right: 12,
    top: 14,
    zIndex: 1,
    padding: 16,
    borderRadius: 8,
  }
}));
