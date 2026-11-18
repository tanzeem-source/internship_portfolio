import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import StoreHeader from '../../components/StoreHeader';

import BusinessPerformanceCard from '../../components/BusinessPerformanceCard';
import {
  businessInfo,
  businessPerformance,
} from '../../../MockData/BusinessData';

import ReviewSummaryCard from '../../components/ReviewSummaryCard';
import { reviews } from '../../../MockData/reviews';

import BusinessActionButton from '../../components/BusinessActionButton';

import PaymentMethodsCard from '../../components/PaymentMethodsCard';

import AdsIcon from '../../../assets/svgComp/ads.svg';
import DiscountIcon from '../../../assets/svgComp/discount.svg';
import PayoutIcon from '../../../assets/svgComp/finance.svg';
import BusinessInfoCard from '../../components/BusinessInfoCard';
import HoursIcon from '../../../assets/svgComp/hours.svg';
import OrdersIcon from '../../../assets/svgComp/orders.svg';
import { ScrollView } from 'react-native-gesture-handler';

const Business = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScreenWrapper style={styles.container}>
      <StoreHeader
        storeName="ABC store"
        isOnline={true}
        closingTime="11:00 PM"
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <ScrollView>
        <View style={styles.content}>
          {/* Business Screen Content */}
          <BusinessPerformanceCard
            sales={businessPerformance.sales}
            orders={businessPerformance.orders}
            navigation={navigation}
          />

          <ReviewSummaryCard reviews={reviews} navigation={navigation} />
          <View style={styles.actionRow}>
            <BusinessActionButton
              title="Ads"
              Icon={AdsIcon}
              onPress={() => navigation.navigate('Ads')}
            />

            <BusinessActionButton
              title="Discount"
              Icon={DiscountIcon}
              onPress={() => navigation.navigate('Discount')}
            />

            <BusinessActionButton
              title="Payouts & Finance"
              Icon={PayoutIcon}
              onPress={() => navigation.navigate('PayoutsFinance')}
            />

            <BusinessActionButton
              title="Business Hours"
              Icon={HoursIcon}
              onPress={() => navigation.navigate('BusinessHours')}
            />

            <BusinessActionButton
              title="Past Orders"
              Icon={OrdersIcon}
              onPress={() => navigation.navigate('PastOrders')}
            />
          </View>

          <BusinessInfoCard
            address={businessInfo.address}
            contact={businessInfo.contactNo}
            email={businessInfo.email}
          />

          <PaymentMethodsCard />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Business;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  content: {
    flex: 1,
    padding: 16,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
});
