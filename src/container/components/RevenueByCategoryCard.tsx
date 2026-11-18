import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const RevenueByCategoryCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue By Category</Text>

      {data.map((item, index) => (
        <View
          key={index}
          style={styles.categoryContainer}
        >
          {/* Category + Revenue */}
          <View style={styles.row}>
            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.revenue}>
              ₹{item.revenue.toLocaleString()}
            </Text>
          </View>

          {/* Progress + Percentage */}
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progress}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.percent}>
              {item.revenuePercent}%
            </Text>
          </View>

          {/* Orders */}
          <Text style={styles.orders}>
            {item.orders} Orders
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RevenueByCategoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
    marginBottom: 20,
  },

  categoryContainer: {
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  category: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333333',
  },

  revenue: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },

  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#0170F0',
    borderRadius: 10,
  },

  percent: {
    width: 45,
    marginLeft: 10,
    textAlign: 'right',
    fontSize: 12 / fontScale,
    color: '#7A7A7A',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  orders: {
    marginTop: 0,
    fontSize: 12 / fontScale,
    color: '#7A7A7A',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});