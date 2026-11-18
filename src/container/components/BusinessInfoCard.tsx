import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';

import LocationIcon from '../../assets/svgComp/address.svg';
import CallIcon from '../../assets/svgComp/contact.svg';
import MailIcon from '../../assets/svgComp/mailer.svg';

const BusinessInfoCard = ({ address, contact, email }) => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Business Information</Text>
      </View>

      {/* ADDRESS */}
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <LocationIcon width={20} height={20} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Address</Text>

          <Text style={styles.value}>{address}</Text>
        </View>
      </View>

      {/* CONTACT */}
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <CallIcon width={20} height={20} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Contact</Text>

          <Text style={styles.value}>{contact}</Text>
        </View>
      </View>

      {/* EMAIL */}
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <MailIcon width={20} height={20} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Email Address</Text>

          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default BusinessInfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  label: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
  },

  value: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#333333',
    lineHeight: 22,
  },
});
