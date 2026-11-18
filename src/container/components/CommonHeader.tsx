import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../assets/svgComp/back.svg';

import { DEVICE_WIDTH, fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const CommonHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={18} height={18} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0170F0',
    width: DEVICE_WIDTH,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
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

  title: {
    color: '#ffffff',
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    marginLeft: 65,
  },
});


