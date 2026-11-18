import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';

import ArrowIcon from '../../assets/svgComp/whitearrow.svg';

const BusinessPerformanceCard = ({ sales, orders, navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Performance</Text>

      <Text style={styles.subtitle}>Track your progress and results here.</Text>

      <View style={styles.statsRow}>
        <View style={styles.salesBox}>
          <Text style={styles.label}>Sales</Text>
          <Text style={styles.value}>{sales}</Text>
        </View>

        <View style={styles.ordersBox}>
          <Text style={styles.label}>No. Of Orders</Text>
          <Text style={styles.value}>{orders}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('BusinessDetails')}
      >
        <Text style={styles.btnText}>See business details</Text>

        <ArrowIcon width={15} height={15} />
      </TouchableOpacity>
    </View>
  );
};

export default BusinessPerformanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  subtitle: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#595959',
    marginTop: 4,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  salesBox: {
    backgroundColor: '#E0EDFC',
    width: '47%',
    borderRadius: 8,
    padding: 16,
  },

  ordersBox: {
    backgroundColor: '#ECFFF2',
    width: '47%',
    borderRadius: 8,
    padding: 16,
  },

  label: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#0170F0',
    marginBottom: 8,
  },

  value: {
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    color: '#333333',
  },

  btn: {
    backgroundColor: '#0170F0',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  btnText: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
