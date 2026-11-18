import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import BagIcon from '../../assets/svgComp/bag.svg';
import MoneyIcon from '../../assets/svgComp/money.svg';
import ClockIcon from '../../assets/svgComp/clock.svg';
import PaymentIcon from '../../assets/svgComp/payment.svg';
import TickIcon from '../../assets/svgComp/greenTick.svg';

const DeliveredOrderCard = ({ order, onPress }) => {
  const [showModal, setShowModal] = useState(false);

  const initials = order.customer
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>Order ID: {order.id}</Text>

          <Text style={styles.date}>
            {order.date} • {order.time}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <TickIcon width={12} height={12} />

          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {/* Customer Section */}
      <View style={styles.customerSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.customerName}>{order.customer}</Text>

          <Text style={styles.phone}>{order.phone}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.infoBox}>
            <View style={styles.blueBox}>
              <BagIcon width={14} height={14} />
            </View>

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.label}>Items</Text>
              <Text style={styles.value}>{order.items.length}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.orangeBox}>
              <MoneyIcon width={14} height={14} />
            </View>

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.value}>₹{order.total}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.infoBox}>
            <View style={styles.yellowBox}>
              <ClockIcon width={14} height={14} />
            </View>

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.label}>Delivery Time</Text>

              <Text style={styles.value}>{order.deliveryTime}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.greenBox}>
              <PaymentIcon width={14} height={14} />
            </View>

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.label}>Payment</Text>

              <Text style={styles.value}>{order.payment}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.dashedLine} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>

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

                <Text style={styles.statusText}>Delivered</Text>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  orderId: {
    fontSize: 16 / fontScale,
    color: '#333333',
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  date: {
    marginTop: 4,
    fontSize: 10 / fontScale,
    color: '#7A7A7A',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2FFEA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },

  statusText: {
    color: '#2F9C4D',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  customerSection: {
    backgroundColor: '#F3F8FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#0170F0',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  customerName: {
    fontSize: 14 / fontScale,
    color: '#494747',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  phone: {
    marginTop: 2,
    fontSize: 12 / fontScale,
    color: '#636363',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  infoBox: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  blueBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  orangeBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  yellowBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  greenBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#ECFFF2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: 12 / fontScale,
    color: '#494747',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  value: {
    fontSize: 12 / fontScale,
    color: '#222222',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    marginHorizontal: 16,
  },

  button: {
    height: 50,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingHorizontal: 20,
  },

  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  modalDate: {
    marginTop: 4,
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
  },

  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  customerPhone: {
    color: '#636363',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    marginTop: 2,
  },

  sectionTitle: {
    marginTop: 16,
    marginLeft: 12,
    marginBottom: 10,
    fontSize: 10 / fontScale,
    color: '#7A7A7A',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  dot: {
    marginRight: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0170F0',
    marginTop: 6,
  },

  itemName: {
    flex: 1,
    fontSize: 14 / fontScale,
    color: '#333333',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    marginVertical: 12,
  },

  totalText: {
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    fontSize: 14 / fontScale,
    color: '#333333',
  },

  primaryBtn: {
    backgroundColor: '#0170F0',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
