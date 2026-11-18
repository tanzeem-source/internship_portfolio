import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TickIcon from '../../assets/svgComp/blueTick.svg';

import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';

const SubscriptionPlanCard = ({ title, price, duration, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, active && styles.activeCard]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subText}>
        Perfect for small vendors getting started
      </Text>

      <Text style={styles.price}>
        ₹{price}
        <Text style={styles.month}>/{duration}</Text>
      </Text>

      <TouchableOpacity style={[styles.btn, active && styles.activeBtn]}>
        <Text style={[styles.btnText, active && styles.activeBtnText]}>
          Choose {title}
        </Text>
      </TouchableOpacity>

      <View style={styles.dashedLine} />

      <Text style={styles.includeTitle}>WHAT'S INCLUDED</Text>

      {[1, 2, 3, 4].map(item => (
        <View key={item} style={styles.featureRow}>
          <TickIcon width={12} height={12} />
          <Text style={styles.featureText}>1st Feature</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

export default SubscriptionPlanCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  activeCard: {
    backgroundColor: '#F4F9FF',
    borderColor: '#0170F0',
  },

  title: {
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 16 / fontScale,
    color: '#000000',
  },

  subText: {
    color: '#636363',
    fontSize: 14 / fontScale,
    marginVertical: 6,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  price: {
    fontSize: 24 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    color: '#333333',
  },

  month: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#333333',
  },

  btn: {
    height: 45,
    borderRadius: 12,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },

  dashedLine: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C4C3C3',
    marginBottom: 14,
  },

  activeBtn: {
    backgroundColor: '#0170F0',
  },

  btnText: {
    color: '#595959',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  activeBtnText: {
    color: '#ffffff',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  includeTitle: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
    marginBottom: 10,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  featureText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#000000',
  },
});
