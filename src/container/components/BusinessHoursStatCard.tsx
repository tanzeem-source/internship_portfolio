import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const BusinessHoursStatsCard = ({ peakHours, totalOrders, revenue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.value, { color: '#2F9C4D' }]}>{peakHours}</Text>

        <Text style={styles.label}>Peak Hours</Text>
      </View>

      <View style={styles.box}>
        <Text style={[styles.value, { color: '#0170F0' }]}>{totalOrders}</Text>

        <Text style={styles.label}>Total Orders</Text>
      </View>

      <View style={styles.box}>
        <Text style={[styles.value, { color: '#B956FF' }]}>₹{revenue}</Text>

        <Text style={styles.label}>Revenue</Text>
      </View>
    </View>
  );
};

export default BusinessHoursStatsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },

  box: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },

  value: {
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  label: {
    marginTop: 6,
    fontSize: 12 / fontScale,
    color: '#222222',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    textAlign: 'center',
  },
});
