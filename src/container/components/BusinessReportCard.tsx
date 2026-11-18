import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import RevenueIcon from '../../assets/svgComp/revenue2.svg';
import OrdersIcon from '../../assets/svgComp/orders3.svg';
import CustomerIcon from '../../assets/svgComp/customer2.svg';
import RatingIcon from '../../assets/svgComp/rating.svg';

const BusinessReportCard = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showMenu, setShowMenu] = useState(false);

  const report = data[selectedPeriod];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Business Report</Text>

          <Text style={styles.subtitle}>
            Comprehensive Performance Analysis
          </Text>
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowMenu(true)}
        >
          <Text style={styles.filterText}>
            {selectedPeriod === 'today'
              ? 'Today'
              : selectedPeriod === 'week'
              ? 'This Week'
              : 'This Month'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.revenueIconContainer}>
            <RevenueIcon width={16} height={16} />
          </View>

          <Text style={styles.value}>₹{report.revenue.toLocaleString()}</Text>

          <Text style={styles.label}>Total Revenue</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.ordersIconContainer}>
            <OrdersIcon width={16} height={16} />
          </View>

          <Text style={styles.value}>{report.orders}</Text>

          <Text style={styles.label}>Total Orders</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.customersIconContainer}>
            <CustomerIcon width={16} height={16} />
          </View>

          <Text style={styles.value}>{report.customers}</Text>

          <Text style={styles.label}>Customers</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.ratingIconContainer}>
            <RatingIcon width={16} height={16} />
          </View>

          <Text style={styles.value}>{report.rating}</Text>

          <Text style={styles.label}>Average Rating</Text>
        </View>
      </View>

      {/* Dropdown */}
      <Modal visible={showMenu} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedPeriod('today');
                setShowMenu(false);
              }}
            >
              <Text>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedPeriod('week');
                setShowMenu(false);
              }}
            >
              <Text>This Week</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedPeriod('month');
                setShowMenu(false);
              }}
            >
              <Text>This Month</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default BusinessReportCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
  },

  filterBtn: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  filterText: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#000000',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: 14,
    marginBottom: 12,
  },

  icon: {
    fontSize: 18,
    marginBottom: 16,
  },

  revenueIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFFF2', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  ordersIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0EDFC', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  customersIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9F1FF', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  ratingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5E3', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  value: {
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    color: '#333333',
  },

  label: {
    marginTop: 4,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#636363',
  },

  overlay: {
    flex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 325,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 140,
    elevation: 5,
  },

  option: {
    padding: 14,
  },
});
