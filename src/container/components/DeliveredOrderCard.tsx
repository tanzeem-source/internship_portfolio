import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import BagIcon from '../../assets/svgComp/bag.svg';
import PaymentIcon from '../../assets/svgComp/payment.svg';
import ClockIcon from '../../assets/svgComp/clock.svg';
import TickIcon from '../../assets/svgComp/greenTick.svg';

const DeliveredOrderCard = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.orderId}>Order ID: {order.id}</Text>

          <Text style={styles.name}>{order.customer}</Text>
        </View>

        <View style={styles.statusBox}>
          <TickIcon width={12} height={12} />

          <Text style={styles.statusText}>Delivered</Text>
        </View>
      </View>

      {/* Middle Row */}
      <View style={styles.middleRow}>
        <View style={styles.infoRow}>
          <BagIcon width={14} height={14} />

          <Text style={styles.infoText}>{order.items.length} items</Text>

          <PaymentIcon
            width={14}
            height={14}
            style={{
              marginLeft: 12,
            }}
          />

          <Text style={styles.infoText}>{order.payment}</Text>
        </View>

        <Text style={styles.total}>₹{order.total}</Text>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.infoRow}>
          <ClockIcon width={12} height={12} />

          <Text style={styles.time}>2 hours ago</Text>
        </View>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.details}>View Details</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainer}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.dragHandle} />

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Order ID: {order.id}</Text>

                <Text style={styles.modalDate}>
                  {order.date} • ₹{order.total}
                </Text>
              </View>

              <View style={styles.statusBadge}>
                <TickIcon width={12} height={12} />

                <Text style={styles.statusBox}>Delivered</Text>
              </View>
            </View>

            {/* CUSTOMER */}
            <View style={styles.customerRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {order.customer
                    .split(' ')
                    .map(word => word[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text style={styles.customerName}>{order.customer}</Text>

                <Text style={styles.customerPhone}>{order.phone}</Text>
              </View>
            </View>

            {/* ITEMS */}
            <Text style={styles.sectionTitle}>ITEMS</Text>

            {order.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.dot}>•</Text>

                <Text style={styles.itemName}>{item}</Text>
              </View>
            ))}

            {/* BILLING */}
            <Text style={styles.sectionTitle}>BILLING SUMMARY</Text>

            <View style={styles.billRow}>
              <Text>Items Total</Text>
              <Text>₹{order.itemsTotal}</Text>
            </View>

            <View style={styles.billRow}>
              <Text>Delivery Charge</Text>
              <Text>₹{order.deliveryCharge}</Text>
            </View>

            <View style={styles.dashedDivider} />

            <View style={styles.billRow}>
              <Text style={styles.totalText}>Total Amount</Text>

              <Text style={styles.totalText}>₹{order.total}</Text>
            </View>

            <View style={styles.billRow}>
              <Text>Payment Method</Text>

              <Text>{order.payment}</Text>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.primaryBtnText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DeliveredOrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  orderId: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222',
  },

  name: {
    fontSize: 13 / fontScale,
    color: '#777',
    marginTop: 4,
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDF8E3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },

  statusText: {
    color: '#22A447',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  infoText: {
    color: '#777',
    fontSize: 12 / fontScale,
  },

  total: {
    fontSize: 24 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222',
  },

  bottomRow: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  time: {
    color: '#999',
    fontSize: 11 / fontScale,
  },

  details: {
    color: '#0170F0',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    marginBottom: 10,
    color: '#333333',
  },

  closeBtn: {
    backgroundColor: '#0170F0',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 18,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modalDate: {
    color: '#7A7A7A',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

 statusBadge: {
  backgroundColor: '#E2FFEA',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  flexDirection: 'row',
  alignItems: 'center',
},

  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  customerName: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#494747',
  },

  customerPhone: {
    color: '#7A7A7A',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 18 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
  },

  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  dot: {
    marginRight: 8,
    color: '#0170F0',
  },

  itemName: {
    color: '#333333',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  dashedDivider: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 14,
  },

  totalText: {
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    fontSize: 14 / fontScale,
    color: '#222222',
  },

  partnerRow: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },

  partnerName: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#222',
  },

  partnerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  partnerSub: {
    fontSize: 12 / fontScale,
    color: '#7A7A7A',
    marginTop: 6,
  },

  callText: {
    color: '#0170F0',
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    marginTop: 10,
  },

  primaryBtn: {
    backgroundColor: '#0170F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  primaryBtnText: {
    color: '#fff',
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    fontSize: 16 / fontScale,
  },
});
