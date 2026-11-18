import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../assets/svgComp/back.svg';


import { DEVICE_WIDTH, fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const CommonHeader2 = ({
  title,
  RightIcon,
  onRightPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={18} height={18} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon */}
      <TouchableOpacity
        style={styles.rightBtn}
        onPress={onRightPress}
      >
        <RightIcon width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader2;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0170F0',
    width: DEVICE_WIDTH,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005AC2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005AC2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },
});