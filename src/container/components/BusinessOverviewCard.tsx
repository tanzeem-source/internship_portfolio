import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const BusinessOverviewCard = ({
  storeName,
  status,
  closingTime,
  rating,
  completion,
  orders,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{storeName}</Text>

      <Text style={styles.statusText}>
        <Text style={styles.onlineText}>{status}</Text>
        {' • '}
        Closes at {closingTime}, Today
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.value}>{rating}</Text>

          <Text style={styles.label}>Rating</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.value}>{completion}%</Text>

          <Text style={styles.label}>Completion</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.value}>{orders}</Text>

          <Text style={styles.label}>Orders</Text>
        </View>
      </View>
    </View>
  );
};

export default BusinessOverviewCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D8EF5',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 6,
  },

  storeName: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  statusText: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  onlineText: {
    color: '#28FF6A',
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  statCard: {
    width: '28%',
    backgroundColor: '#1E7CF0',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },

  value: {
    color: '#FFFFFF',
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  label: {
    marginTop: 4,
    color: '#FDFDFD',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});
