import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const OrderStatsCard = ({
  totalOrders,
  todayOrders,
  cancelledOrders,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.count, { color: '#2F9C4D' }]}>
          {totalOrders}
        </Text>

        <Text style={styles.label}>Total Orders</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.count, { color: '#0170F0' }]}>
          {todayOrders}
        </Text>

        <Text style={styles.label}>Today's Order</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.count, { color: '#FF383C' }]}>
          {cancelledOrders}
        </Text>

        <Text style={styles.label}>Cancelled</Text>
      </View>
    </View>
  );
};

export default OrderStatsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 8,
    marginTop: 8,
  },

  count: {
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  label: {
    marginTop: 4,
    fontSize: 12 / fontScale,
    color: '#222222',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});