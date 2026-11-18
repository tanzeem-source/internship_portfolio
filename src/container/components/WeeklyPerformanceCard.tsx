import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';
import GrowthArrowIcon from '../../assets/svgComp/growthArrow.svg';

const WeeklyPerformanceCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Performance</Text>

      {data.map((item, index) => (
        <View key={index} style={styles.weekCard}>
          <View style={styles.leftSection}>
            <View style={styles.weekNumberCircle}>
              <Text style={styles.weekNumber}>{index + 1}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.weekText}>{item.week}</Text>

              <Text style={styles.ordersText}>{item.orders} Orders</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.revenueText}>
              ₹{item.revenue.toLocaleString()}
            </Text>

            <View style={styles.growthContainer}>
              <GrowthArrowIcon width={6} height={8} />

              <Text style={styles.growthText}>+{item.growth}%</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeeklyPerformanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 4,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
    marginBottom: 16,
  },

  weekCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  weekNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  weekNumber: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  infoContainer: {
    marginLeft: 12,
  },

  weekText: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#000000',
  },

  ordersText: {
    marginTop: 0,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#535353',
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  revenueText: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222222',
  },

  growthContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},

growthText: {
  marginLeft: 4,
  fontSize: 12 / fontScale,
  fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  color: '#27AE60',
},
});
