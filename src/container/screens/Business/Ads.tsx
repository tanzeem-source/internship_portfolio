import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CommonHeader from '../../components/CommonHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import AdsCampaignCard from '../../components/AdsCampaignCard';

import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const Tab = createMaterialTopTabNavigator();

/* -------------------- Ads Data -------------------- */

const adsData = [
  {
    image: require('../../../assets/Images/summer-sale1.png'),
    title: 'Buraq Summer Sale Campaign',
    subtitle:'Get up to 50% off on all summer essentials.\nLimited time offer!',
    reach: '14,850',
    clicks: '14,850',
  },
  {
    image: require('../../../assets/Images/summer-sale2.png'),
    title: 'Buraq Summer Sale Campaign',
    subtitle:'Get up to 50% off on all summer essentials.\nLimited time offer!',
    reach: '12,420',
    clicks: '11,300',
  },
  {
    image: require('../../../assets/Images/summer-sale3.png'),
    title: 'Buraq Summer Sale Campaign',
    subtitle:'Get up to 50% off on all summer essentials.\nLimited time offer!',
    reach: '18,900',
    clicks: '16,500',
  },
];

const upcomingAds = [];
const completedAds = [];

/* -------------------- Custom Tab Label -------------------- */
const TabLabel = ({ title, count, focused }) => (
  <View style={styles.tabLabelContainer}>
    <Text
      style={[
        styles.customTabLabel,
        {
          color: focused ? '#FFFFFF' : '#EFEFEF',
        },
      ]}
    >
      {title}
    </Text>

    {count > 0 && (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: focused ? '#FDFDFD' : '#D8E8FF',
          },
        ]}
      >
        <Text
          style={[
            {
              color: focused ? '#0170F0' : '#5E7BA3',
              fontSize: 14 / fontScale,
              fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
            },
          ]}
        >
          {count}
        </Text>
      </View>
    )}
  </View>
);

/* -------------------- All Tab -------------------- */

const AllAdsScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {adsData.map((item, index) => (
        <AdsCampaignCard
          key={index}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
          reach={item.reach}
          clicks={item.clicks}
        />
      ))}
    </ScrollView>
  );
};

/* -------------------- Upcoming Tab -------------------- */

const UpcomingAdsScreen = () => {
  return <View style={{ flex: 1 }} />;
};

/* -------------------- Completed Tab -------------------- */

const CompletedAdsScreen = () => {
  return <View style={{ flex: 1 }} />;
};

/* -------------------- Main Screen -------------------- */

const Ads = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Marketing Ads" />

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.indicator,
        }}
      >
        <Tab.Screen
          name="All"
          component={AllAdsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel title="All" count={adsData.length} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Upcoming"
          component={UpcomingAdsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel
                title="Upcoming"
                count={upcomingAds.length}
                focused={focused}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Completed"
          component={CompletedAdsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabLabel
                title="Completed"
                count={completedAds.length}
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ScreenWrapper>
  );
};

export default Ads;

/* -------------------- Styles -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  tabBar: {
    backgroundColor: '#0170F0',
    elevation: 0,
    shadowOpacity: 0,
  },

  indicator: {
    backgroundColor: '#FFFFFF',
    height: 3,
    borderRadius: 2,
  },

  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  customTabLabel: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});
