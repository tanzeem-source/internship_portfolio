import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

const StoreInfoCard = ({
  image,
  storeName,
  mobile,
  email,
  openingTime,
  closingTime,
  openingDays,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.storeName}>{storeName}</Text>

      <Text style={styles.info}>
        {mobile} | {email}
      </Text>

      <View style={styles.box}>
        <View>
          <Text style={styles.label}>Opening Time</Text>
          <Text style={styles.infoTiming}>{openingTime}</Text>
        </View>

        <View>
          <Text style={styles.label}>Closing Time</Text>
          <Text style={styles.infoTiming}>{closingTime}</Text>
        </View>

        <View>
          <Text style={styles.label}>Opening Days</Text>
          <Text style={styles.infoTiming}>{openingDays}</Text>
        </View>
      </View>
    </View>
  );
};

export default StoreInfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    marginTop: 15,
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  storeName: {
    fontSize: 20/fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    marginTop: 20,
  },

  info: {
    color: 'gray',
    marginVertical: 10,
  },

  box: {
    borderWidth: 0.5,
    borderColor: '#0170F0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
  },

  label: {
   color: '#0170F0',
   fontSize: 12/fontScale,
   fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  infoTiming: {
    color: '#0170F0',
    fontSize: 10/fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  

  
});