import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';
import ReachIcon from '../../assets/svgComp/reach.svg';
import HeartIcon from '../../assets/svgComp/heart.svg';

const AdsCampaignCard = ({ image, title, subtitle, reach, clicks }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.banner} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.dashedLine} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.iconBox}>
            <ReachIcon width={16} height={16} />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Reach</Text>
            <Text style={styles.value}>{reach}</Text>
          </View>
        </View>

        <View style={[styles.statItem, styles.centerStatItem]}>
          <View style={[styles.iconBox, { backgroundColor: '#E2FFEA' }]}>
            <HeartIcon width={16} height={16} />
          </View>

          <View style={{ marginLeft: 8 }}>
            <Text style={styles.label}>Clicks</Text>
            <Text style={styles.value}>{clicks}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdsCampaignCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },

  banner: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },

  title: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
    marginTop: 12,
    lineHeight: 19,
  },

  subtitle: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#494747',
    lineHeight: 18,
    marginTop: 6,
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    marginVertical: 14,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  centerStatItem: {
    marginLeft: 40,
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: 10 / fontScale,
    color: '#636363',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  value: {
    fontSize: 12 / fontScale,
    color: '#333333',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
