import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

import CashIcon from '../../assets/svgComp/cash.svg';
import UpiIcon from '../../assets/svgComp/upi.svg';
import CardIcon from '../../assets/svgComp/card.svg';
import BankIcon from '../../assets/svgComp/bank.svg';

const PaymentMethodsCard = () => {
  const [methods, setMethods] = useState([
    {
      id: 1,
      title: 'Cash On Delivery',
      enabled: true,
      Icon: CashIcon,
    },
    {
      id: 2,
      title: 'UPI',
      enabled: true,
      Icon: UpiIcon,
    },
    {
      id: 3,
      title: 'Credit/Debit Card',
      enabled: true,
      Icon: CardIcon,
    },
    {
      id: 4,
      title: 'Net Banking',
      enabled: true,
      Icon: BankIcon,
    },
  ]);

  const toggleMethod = (id: number) => {
    setMethods(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Payment Methods</Text>

        <TouchableOpacity>
          <Text style={styles.manageText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* METHODS */}
      {methods.map(item => {
        const Icon = item.Icon;

        return (
          <View key={item.id} style={styles.methodCard}>
            <View style={styles.leftSection}>
              <View style={styles.iconBox}>
                <Icon width={20} height={20} />
              </View>

              <Text style={styles.methodText}>{item.title}</Text>
            </View>

            <Switch
              value={item.enabled}
              onValueChange={() => toggleMethod(item.id)}
              trackColor={{
                false: '#D9D9D9',
                true: '#2F9C4D',
              }}
              thumbColor="#fff"
            />
          </View>
        );
      })}
    </View>
  );
};

export default PaymentMethodsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  manageText: {
    fontSize: 14 / fontScale,
    color: '#0170F0',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  methodCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginBottom: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 40,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  methodText: {
    fontSize: 14 / fontScale,
    color: '#000000',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});