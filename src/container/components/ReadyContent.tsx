import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import DeliveryManIcon from '../../assets/svgComp/deliveryMan.svg';
import StarIcon from '../../assets/svgComp/star.svg';
import CallIcon from '../../assets/svgComp/call.svg';
import ArrivalIcon from '../../assets/svgComp/arrival.svg';


interface Partner {
  name: string;
  rating: number;
  phone: string;
}

interface OrderType {
  partner?: Partner | null;
}

const ReadyContent: React.FC<{ order: OrderType }> = ({ order }) => {
  return (
    <>
      {order.partner ? (
        <>
          {/* PARTNER INFO */}
          <View style={styles.partnerRow}>
            
            {/* ICON */}
            <DeliveryManIcon width={28} height={28} />

            {/* TEXT SIDE */}
            <View style={styles.partnerInfo}>
              
              <Text style={styles.partnerName}>
                {order.partner.name} (Delivery Partner)
              </Text>

              {/* RATING + CALL */}
              <View style={styles.subRow}>
                
                <View style={styles.ratingRow}>
                  <StarIcon width={14} height={14} />
                  <Text style={styles.partnerSub}>
                    {order.partner.rating} Ratings
                  </Text>
                </View>

                <View style={styles.separator} />

                <TouchableOpacity
                  style={styles.callRow}
                  onPress={() =>
                    Linking.openURL(`tel:${order.partner?.phone}`)
                  }
                >
                  <CallIcon width={14} height={14} />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ARRIVAL */}
          <View style={styles.arrivalBox}>
            <ArrivalIcon style={{width:16, height:16, marginRight:6}}/>
            <Text style={styles.arrivalText}>
              Arriving in 2 minutes
            </Text>
          </View>
        </>
      ) : (
        <>
          {/* NO PARTNER (WITH ICON) */}
          <View style={styles.partnerRow}>
            
            <DeliveryManIcon width={28} height={28} />

            <View style={styles.partnerInfo}>
              <Text style={styles.deliveryTitle}>
                Delivery Partner
              </Text>

              <Text style={styles.deliverySub}>
                Not assigned yet
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.waitingBtn}>
            <Text style={styles.waitingText}>
              Waiting For Pickup
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default ReadyContent;

const styles = StyleSheet.create({
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  partnerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  partnerName: {
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    fontSize: 12 / fontScale,
    color: '#222222',
  },

  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },

  separator: {
    width: 1,
    height: 12,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 8,
  },

  callRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  partnerSub: {
    fontSize: 10 / fontScale,
    color: '#5E5E5E',
    marginLeft: 4,
  },

  callText: {
    color: '#0170F0',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 10 / fontScale,
    marginLeft: 4,
  },

  divider: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    marginVertical: 10,
  },

  arrivalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#0170F0',
    borderRadius: 10,

    height: 44,
  },

  arrivalDot: {
    color: '#0170F0',
    fontSize: 20,
    marginRight: 6,
  },

  arrivalText: {
    color: '#0170F0',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 14 / fontScale,
  },

  deliveryTitle: {
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 12 / fontScale,
  },

  deliverySub: {
    color: '#5E5E5E',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  waitingBtn: {
    borderWidth: 1,
    borderColor: '#0170F0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },

  waitingText: {
    color: '#0170F0',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 14 / fontScale,
  },
});