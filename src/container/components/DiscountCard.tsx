import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import DiscountIcon from '../../assets/svgComp/discount3.svg';
import DeleteIcon from '../../assets/svgComp/delete.svg';
import CalendarIcon from '../../assets/svgComp/calendar.svg';

const DiscountCard = ({
  discountName,
  discountPercent,
  minOrder,
  maxDiscount,
  usageLimit,
  usedCount,
  startDate,
  endDate,
  status,
  onDelete,
}) => {
  const progress = (usedCount / usageLimit) * 100;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.discountName}>
              {discountName}
            </Text>

            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>
                {status}
              </Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Welcome offers for new customers
          </Text>
        </View>

        <TouchableOpacity onPress={onDelete}>
          <DeleteIcon width={18} height={18} />
        </TouchableOpacity>
      </View>

      {/* Offer Details */}
      <View style={styles.offerRow}>
        <View style={styles.offerLeft}>
          <View style={styles.iconBox}>
            <DiscountIcon width={18} height={18} />
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.discountValue}>
              {discountPercent}% OFF
            </Text>

            <Text style={styles.minOrder}>
              Min Order: ₹{minOrder}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.maxLabel}>
            Max Discount
          </Text>

          <Text style={styles.maxValue}>
            ₹{maxDiscount}
          </Text>
        </View>
      </View>

      {/* Usage */}
      <View style={styles.usageRow}>
        <Text style={styles.usageText}>
          Usage: {usedCount}/{usageLimit}
        </Text>

        <Text style={styles.usagePercent}>
          {Math.round(progress)}%
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      {/* Divider */}
      <View style={styles.dashedLine} />

      {/* Date */}
      <View style={styles.dateRow}>
        <CalendarIcon width={14} height={14} />

        <Text style={styles.dateText}>
          {startDate} - {endDate}
        </Text>
      </View>
    </View>
  );
};

export default DiscountCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  discountName: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    color: '#333333',
  },

  activeBadge: {
    marginLeft: 10,
    backgroundColor: '#E2FFEA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  activeText: {
    color: '#2F9C4D',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  subtitle: {
    marginTop: 4,
    color: '#919191',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  offerRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  offerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  discountValue: {
    fontSize: 14 / fontScale,
    color: '#222222',
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  minOrder: {
    marginTop: 2,
    color: '#636363',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  maxLabel: {
    color: '#8A8A8A',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    textAlign: 'right',
  },

  maxValue: {
    marginTop: 4,
    color: '#222222',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    textAlign: 'right',
  },

  usageRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  usageText: {
    color: '#7A7A7A',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  usagePercent: {
    color: '#494747',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    marginTop: 8,
  },

  progressFill: {
    height: 8,
    backgroundColor: '#0170F0',
    borderRadius: 4,
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D8D8D8',
    marginVertical: 16,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateText: {
    marginLeft: 8,
    color: '#494747',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR
  },
});