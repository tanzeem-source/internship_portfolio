import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader from '../../components/CommonHeader';
import SubscriptionPlanCard from '../../components/SubscriptionPlanCard';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const Tab = createMaterialTopTabNavigator();

const monthlyPlans = [
  { title: 'Basic', price: 19, duration: 'month' },
  { title: 'Pro', price: 219, duration: 'month' },
  { title: 'Premium', price: 400, duration: 'month' },
];

const yearlyPlans = [
  { title: 'Basic', price: 199, duration: 'year' },
  { title: 'Pro', price: 2199, duration: 'year' },
  { title: 'Premium', price: 4000, duration: 'year' },
];

const PlanScreen = ({ plans }) => {
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {plans.map(plan => (
        <SubscriptionPlanCard
          key={plan.title}
          {...plan}
          active={selectedPlan === plan.title}
          onPress={() => setSelectedPlan(plan.title)}
        />
      ))}
    </ScrollView>
  );
};

const MonthlyTab = () => <PlanScreen plans={monthlyPlans} />;

const YearlyTab = () => <PlanScreen plans={yearlyPlans} />;

const SubscriptionPlan = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Subscription Plan" />

      <View style={styles.topTextContainer}>
        <Text style={styles.heading}>
          Select the perfect plan that fits your
        </Text>

        <Text style={styles.subHeading}>business needs</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            borderRadius: 20,
            height: '100%',
          },

          tabBarStyle: {
            backgroundColor: '#0170F0',
            elevation: 0,
          },

          tabBarActiveTintColor: '#0170F0',
          tabBarInactiveTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Monthly"
          component={MonthlyTab}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
                  color: focused ? '#0170F0' : '#fff',
                }}
              >
                Monthly
              </Text>
            ),
          }}
        />

        <Tab.Screen
          name="Yearly"
          component={YearlyTab}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
                  color: focused ? '#0170F0' : '#fff',
                }}
              >
                Yearly
                <Text
                  style={{
                    fontSize: 14 / fontScale,
                    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
                    color: focused ? '#0170F0' : '#FFFFFF',
                  }}
                >
                  {' '}
                  -17%
                </Text>
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </ScreenWrapper>
  );
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  content: {
    padding: 16,
  },

  topTextContainer: {
    backgroundColor: '#0170F0',
    alignItems: 'center',
    paddingBottom: 18,
  },

  heading: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#FDFDFD',
  },

  subHeading: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#FDFDFD',
    marginTop: 0,
  },
});
