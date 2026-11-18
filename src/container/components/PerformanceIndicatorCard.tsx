import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import DeliveryIcon from '../../assets/svgComp/deliverySuccess.svg';
import CancelIcon from '../../assets/svgComp/cancel.svg';
import OrderValueIcon from '../../assets/svgComp/orderValue.svg';

const PerformanceIndicatorsCard = ({
  deliverySuccessRate,
  cancellationRate,
  averageOrderValue,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Performance Indicators
      </Text>

      {/* Delivery Success Rate */}
      <View
        style={[
          styles.indicatorCard,
          styles.successCard,
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              styles.successIconContainer,
            ]}
          >
            <DeliveryIcon
              width={16}
              height={16}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              Delivery Success Rate
            </Text>

            <Text style={styles.subHeading}>
              Orders delivered on time
            </Text>
          </View>
        </View>

        <Text style={styles.successValue}>
          {deliverySuccessRate}%
        </Text>
      </View>

      {/* Cancellation Rate */}
      <View
        style={[
          styles.indicatorCard,
          styles.cancelCard,
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              styles.cancelIconContainer,
            ]}
          >
            <CancelIcon
              width={16}
              height={16}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              Cancellation Rate
            </Text>

            <Text style={styles.subHeading}>
              Orders cancelled
            </Text>
          </View>
        </View>

        <Text style={styles.cancelValue}>
          {cancellationRate}%
        </Text>
      </View>

      {/* Average Order Value */}
      <View
        style={[
          styles.indicatorCard,
          styles.orderCard,
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              styles.orderIconContainer,
            ]}
          >
            <OrderValueIcon
              width={16}
              height={16}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              Average Order Value
            </Text>

            <Text style={styles.subHeading}>
              Per Transaction
            </Text>
          </View>
        </View>

        <Text style={styles.orderValue}>
          ₹{averageOrderValue}
        </Text>
      </View>
    </View>
  );
};

export default PerformanceIndicatorsCard;

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

  indicatorCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  successCard: {
    backgroundColor: '#F4FFF7',
  },

  cancelCard: {
    backgroundColor: '#FFEFEF',
  },

  orderCard: {
    backgroundColor: '#F1F7FF',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIconContainer: {
    backgroundColor: '#E2FFEA',
  },

  cancelIconContainer: {
    backgroundColor: '#FFDFE0',
  },

  orderIconContainer: {
    backgroundColor: '#E0EDFC',
  },

  textContainer: {
    marginLeft: 12,
  },

  heading: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#000000',
  },

  subHeading: {
    marginTop: 2,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#535353',
  },

  successValue: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#2F9C4D',
  },

  cancelValue: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#FF383C',
  },

  orderValue: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#0170F0',
  },
});