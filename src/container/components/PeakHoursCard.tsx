import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import FireIcon from '../../assets/svgComp/fire.svg';

const PeakHoursCard = ({ peakHours }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <FireIcon width={20} height={20} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Peak Hours Today</Text>

          <Text style={styles.subtitle}>
            Prepare for high order volume during these times
          </Text>
        </View>
      </View>

      <View style={styles.hoursContainer}>
        {peakHours.map((hour, index) => (
          <View key={index} style={styles.hourBox}>
            <Text style={styles.hourText}>{hour}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PeakHoursCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF383C',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FF383C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#222222',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#636363',
    lineHeight: 18,
  },

  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },

  hourBox: {
  width: 70,
  height: 36,
  borderWidth: 1,
  borderColor: '#FF383C',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  marginBottom: 10,
},

  hourText: {
    color: '#FF383C',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});