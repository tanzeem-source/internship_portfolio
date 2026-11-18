import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import DeliveryManIcon from '../../assets/svgComp/deliveryMan.svg';
import StarIcon from '../../assets/svgComp/star.svg';
import LocationIcon from '../../assets/svgComp/location.svg';

interface Partner {
  name: string;
  rating?: number;
}

interface OrderType {
  partner?: Partner | null;
}

interface Props {
  order: OrderType;
  onView: (order: OrderType) => void;
}

const PickedContent: React.FC<Props> = ({ order, onView }) => {
  return (
    <>
      {/* PARTNER ROW */}
      <View style={styles.partnerRow}>
        {/* LEFT ICON */}
        <DeliveryManIcon width={28} height={28} />

        {/* RIGHT CONTENT */}
        <View style={styles.partnerInfo}>
          {/* NAME + RATING */}
          <View style={styles.nameRow}>
            <Text style={styles.partnerName}>
              {order.partner?.name} (Delivery Partner)
            </Text>

            <View style={styles.ratingRow}>
              <StarIcon width={12} height={12} />
              <Text style={styles.ratingText}>
                {order.partner?.rating} Ratings
              </Text>
            </View>
          </View>

          {/* PICKUP TIME */}
          <Text style={styles.pickupText}>Picked up at 10:42 PM</Text>

          {/* LOCATION ROW */}
          <View style={styles.locationRow}>
            <LocationIcon width={10} height={12} />
            <Text style={styles.partnerSub}>Delivering to customer</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.secondaryBtn2}
        onPress={() => onView(order)}
      >
        <Text style={styles.buttonText}>View Summary</Text>
      </TouchableOpacity>
    </>
  );
};

export default PickedContent;

const styles = StyleSheet.create({
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },

  partnerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  partnerName: {
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    fontSize: 12 / fontScale,
    color: '#222222',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  },

  ratingText: {
    fontSize: 10 / fontScale,
    color: '#5E5E5E',
    marginLeft: 4,
  },

  pickupText: {
    fontSize: 10 / fontScale,
    color: '#5E5E5E',
    marginTop: 2,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  partnerSub: {
    fontSize: 10 / fontScale,
    color: '#222222',
    marginLeft: 4,
  },

  divider: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    marginVertical: 10,
  },

  secondaryBtn2: {
    height: 44,
    backgroundColor: '#0170F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
