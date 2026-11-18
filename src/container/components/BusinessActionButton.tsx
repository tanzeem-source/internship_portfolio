import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {DEVICE_WIDTH, fontScale} from '../utilities/Utils';
import {FONTS} from '../../constants/common.constants';

const BusinessActionButton = ({
  title,
  Icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}>
      <View style={styles.iconBox}>
        <Icon
          width={24}
          height={24}
        />
      </View>

      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BusinessActionButton;

const styles =
  StyleSheet.create({
    button: {
      alignItems: 'center',
      width: '18%',
    },

    iconBox: {
      width: DEVICE_WIDTH/7,
      height: 58,
      borderRadius: 12,
      backgroundColor:
        '#FFFFFF',
      justifyContent:
        'center',
      alignItems: 'center',
      marginBottom: 8,
    },

    text: {
      fontSize:
        12 / fontScale,
      textAlign: 'center',
      color: '#000000',
      fontFamily:
        FONTS.SF_PRO_ROUNDED_REGULAR,
    },
  });