import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import Order from '../../screens/Order';
import Items from '../../screens/Items';
import Business from '../../screens/Business';
import Account from '../../screens/Account';


import SubscriptionPlan from '../../screens/Account/SubscriptionPlan';
import PaymentHistory from '../../screens/Account/PaymentHistory';
import HelpSupport from '../../screens/Account/HelpSupport';
import TermsPolicies from '../../screens/Account/TermsPolicies';
import Settings from '../../screens/Account/Settings';

import Ads from '../../screens/Business/Ads';
import BusinessDetails from '../../screens/Business/BusinessDetails';
import Discount from '../../screens/Business/Discount';
import PayoutsFinance from '../../screens/Business/PayoutsFinance';
import BusinessHours from '../../screens/Business/BusinessHours';
import PastOrders from '../../screens/Business/PastOrders';
import AllReviews from '../../screens/Business/AllReviews';

// SVG imports
import OrderIcon from '../../../assets/Svg/orders.svg';
import ItemsIcon from '../../../assets/Svg/items.svg';
import BusinessIcon from '../../../assets/Svg/business.svg';
import AccountIcon from '../../../assets/Svg/account.svg';

import { FONTS } from '../../../constants/common.constants';
import { DEVICE_HEIGHT, fontScale } from '../../utilities/Utils';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountMain" component={Account} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="TermsPolicies" component={TermsPolicies} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function BusinessStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BusinessMain" component={Business} />
      <Stack.Screen name="Ads" component={Ads} />
      <Stack.Screen name="Discount" component={Discount} />
      <Stack.Screen name="PayoutsFinance" component={PayoutsFinance} />
      <Stack.Screen name="BusinessHours" component={BusinessHours} />
      <Stack.Screen name="PastOrders" component={PastOrders} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        //  Text colors
        tabBarActiveTintColor: '#0170F0',
        tabBarInactiveTintColor: '#222222',

        //  Tab styling
        tabBarStyle: {
          height: DEVICE_HEIGHT / 9,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopWidth: 0,
          backgroundColor: '#fff',
        },

        tabBarLabelStyle: {
          fontSize: 10 / fontScale,
          fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
        },

        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },

        //  Icon + Underline
        tabBarIcon: ({ focused }) => {
          const renderIcon = () => {
            if (route.name === 'Order')
              return (
                <OrderIcon
                  width={26}
                  height={26}
                  {...(focused ? { fill: '#0170F0' } : {})}
                />
              );

            if (route.name === 'Business')
              return (
                <BusinessIcon
                  width={26}
                  height={26}
                  {...(focused ? { fill: '#0170F0' } : {})}
                />
              );

            if (route.name === 'Items')
              return (
                <ItemsIcon
                  width={26}
                  height={26}
                  {...(focused ? { fill: '#0170F0' } : {})}
                />
              );

            if (route.name === 'Account')
              return (
                <AccountIcon
                  width={26}
                  height={26}
                  {...(focused ? { fill: '#0170F0' } : {})}
                />
              );

            return null;
          };

          return (
            <View style={{ alignItems: 'center', width: 70 }}>
              {/* ICON */}
              {renderIcon()}

              {/*  UNDERLINE BELOW */}
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    width: 53,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: '#0170F0',
                  }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Business" component={BusinessStack} />
      <Tab.Screen name="Items" component={Items} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
