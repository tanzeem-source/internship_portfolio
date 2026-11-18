import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader2 from '../../components/CommonHeader2';

import FilterIcon from '../../../assets/svgComp/filter.svg';
import {
  businessHoursStats,
  hourlyPerformance,
  peakHoursData,
} from '../../../MockData/businessHoursStats';
import BusinessHoursStatsCard from '../../components/BusinessHoursStatCard';
import PeakHoursCard from '../../components/PeakHoursCard';
import HourlyPerformanceCard from '../../components/HourlyPerformanceCard';
import { ScrollView } from 'react-native-gesture-handler';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const BusinessHours = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader2
        title="Business Hours"
        RightIcon={FilterIcon}
        onRightPress={() => {}}
      />
      <ScrollView>
        <BusinessHoursStatsCard
          peakHours={businessHoursStats.peakHours}
          totalOrders={businessHoursStats.totalOrders}
          revenue={businessHoursStats.revenue}
        />

        <PeakHoursCard peakHours={peakHoursData} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hourly Breakdown</Text>
        </View>

        {hourlyPerformance.map(item => (
          <HourlyPerformanceCard
            key={item.hour}
            hour={item.hour}
            orders={item.orders}
            revenue={item.revenue}
            progress={item.progress}
          />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default BusinessHours;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  sectionHeader: {
  marginTop: 20,
  marginHorizontal: 16,
  marginBottom: 12,
},

sectionTitle: {
  fontSize: 14 / fontScale,
  fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  color: '#222222',
},
});
