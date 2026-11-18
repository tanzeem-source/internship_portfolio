import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import OrdersIcon from '../../assets/svgComp/orders2.svg';
import RevenueIcon from '../../assets/svgComp/revenue.svg';

const HourlyPerformanceCard = ({
  hour,
  orders,
  revenue,
  progress,
}) => {
  const getStatus = () => {
    if (orders <= 2) {
      return {
        text: 'Quiet',
        color: '#595959',
        bg: '#E6E6E6',
      };
    }

    if (orders <= 5) {
      return {
        text: 'Light',
        color: '#0170F0',
        bg: '#E0EDFC',
      };
    }

    if (orders <= 8) {
      return {
        text: 'Moderate',
        color: '#FEBC2F',
        bg: '#FFFBEB',
      };
    }

    return {
      text: 'Busy',
      color: '#FF383C',
      bg: '#FFDFE0',
    };
  };

  const status = getStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{hour}</Text>

      <View style={styles.middle}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
                backgroundColor: status.color,
              },
            ]}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <OrdersIcon width={12} height={12} />

            <Text style={styles.infoText}>
              {orders} Orders
            </Text>
          </View>

          <View style={styles.infoItem}>
            <RevenueIcon width={12} height={12} />

            <Text style={styles.infoText}>
              ₹{revenue}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.statusBox,
          {
            backgroundColor: status.bg,
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: status.color,
            },
          ]}
        >
          {status.text}
        </Text>
      </View>
    </View>
  );
};

export default HourlyPerformanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  hour: {
    width: 45,
    fontSize: 14 / fontScale,
    color: '#333333',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  middle: {
    flex: 1,
    marginHorizontal: 12,
  },

  progressTrack: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#EAEAEA',
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    borderRadius: 6,
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  infoText: {
    marginLeft: 4,
    fontSize: 12 / fontScale,
    color: '#636363',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  statusBox: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});