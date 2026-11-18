import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader from '../../components/CommonHeader';
import PaymentHistoryCard from '../../components/PaymentHistoryCard';

import { paymentDetails } from '../../../MockData/PaymentDetails';

import SearchIcon from '../../../assets/svgComp/search.svg';
import FilterIcon from '../../../assets/svgComp/filter.svg';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const PaymentHistory = () => {
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('All');

  const filteredPayments = paymentDetails.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.amount.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === 'All'
        ? true
        : filterType === 'Orders'
        ? item.type === 'order'
        : item.type === 'payout';

    return matchesSearch && matchesType;
  });

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Payment History" />

      {/* Search Section */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <SearchIcon width={18} height={18} />

          <TextInput
            placeholder="Search by order ID, description or amount..."
            placeholderTextColor="#595959"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(!showFilter)}
        >
          <FilterIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {showFilter && (
        <View style={styles.dropdown}>
          <Text style={styles.sortTitle}>Sort By</Text>

          {['All', 'Orders', 'Payouts'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.option,
                filterType === item && styles.activeOption,
              ]}
              onPress={() => {
                setFilterType(item);
                setShowFilter(false);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  filterType === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Payment Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {filteredPayments.map((item, index) => (
          <PaymentHistoryCard key={index} {...item} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },

  searchBox: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005AC2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  dropdown: {
    position: 'absolute',
    top: 135,
    right: 16,
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 8,
    zIndex: 100,
  },

  sortTitle: {
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    marginBottom: 12,
    color: '#535353',
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },

  activeOption: {
    backgroundColor: '#E0EDFC',
  },

  optionText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333',
  },

  activeText: {
    color: '#0170F0',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },
});
