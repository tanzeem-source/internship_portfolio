import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader2 from '../../components/CommonHeader2';

import FilterIcon from '../../../assets/svgComp/filter.svg';
import SearchIcon from '../../../assets/svgComp/search.svg';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

import OrderStatsCard from '../../components/OrderStatsCard';
import { orderStats } from '../../../MockData/BusinessData';
import { deliveredOrders } from '../../../MockData/deliveredOrders';
import DeliveredOrdersCard from '../../components/DeliveredOrdersCard';

const PastOrders = () => {
  const [searchText, setSearchText] = useState('');

  const filteredOrders = deliveredOrders.filter(order => {
  const search = searchText.toLowerCase();

  return (
    order.id.toLowerCase().includes(search) ||
    order.customer.toLowerCase().includes(search)
  );
});

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader2
        title="All Orders"
        RightIcon={FilterIcon}
        onRightPress={() => {
          console.log('Filter Pressed');
        }}
      />

      {/* Screen Content */}
      <View style={{ backgroundColor: '#0170f0', paddingBottom: 25 }}>
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} />

          <TextInput
            placeholder="Search by order ID or customer name"
            placeholderTextColor="#595959"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
      </View>

      <OrderStatsCard
        totalOrders={orderStats.totalOrders}
        todayOrders={orderStats.todayOrders}
        cancelledOrders={orderStats.cancelledOrders}
      />

      <ScrollView>
        {filteredOrders.map(order => (
          <DeliveredOrdersCard key={order.id} order={order} onPress={() => {}} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PastOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#222222',
  },
});
