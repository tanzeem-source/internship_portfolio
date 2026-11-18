import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import OrderIcon from '../../assets/svgComp/orderBag.svg';
import PayoutIcon from '../../assets/svgComp/payout.svg';
import CompletedIcon from '../../assets/svgComp/completed.svg';

const PaymentHistoryCard = ({
  type,
  title,
  amount,
  date,
  time,
  status,
  id,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topRow}>
        {/* Left */}
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: type === 'payout' ? '#E0EDFC' : '#E2FFEA',
              },
            ]}
          >
            {type === 'payout' ? (
              <PayoutIcon width={18} height={18} />
            ) : (
              <OrderIcon width={18} height={18} />
            )}
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.dateText}>
              {date} • {time}
            </Text>
          </View>
        </View>

        {/* Right */}
        <View style={styles.rightSection}>
          <Text style={styles.amount}>{amount}</Text>

          <View style={styles.statusBox}>
            <CompletedIcon width={12} height={12} />

            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom */}
      <Text style={styles.idText}>ID: {id}</Text>
    </View>
  );
};

export default PaymentHistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  iconBox: {
    width: 35,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333333',
  },

  dateText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
    marginTop: 4,
  },

  amount: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#2F9C4D',
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2FFEA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
  },

  statusText: {
    color: '#16A34A',
    fontSize: 12 / fontScale,
    marginLeft: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 14,
  },

  idText: {
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
  },
});
