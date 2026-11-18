import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';
import ReadyIcon from '../../assets/svgComp/ready.svg';
import BikeIcon from '../../assets/svgComp/bike.svg';
import TickIcon from '../../assets/svgComp/tick.svg';
import CustomerIcon from '../../assets/svgComp/customer.svg';

interface OrderType {
  id: string;
  time?: string;
  customer: string;
  items: string[];
  total: number;
  payment: string;
}

interface Props {
  order: OrderType;
  type: 'preparing' | 'ready' | 'picked';
  children?: React.ReactNode; // for subcomponents
}

const OrderCard: React.FC<Props> = ({ order, type, children }) => {
  return (
    <View style={styles.card}>
      {/* HEADER */}

      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>
          <Text style={{ color: '#F59E0B' }}>Order ID: </Text>
          {order.id}
        </Text>

        {type === 'preparing' ? (
          <Text style={styles.time}>{order.time}</Text>
        ) : (
          (() => {
            const getStatusConfig = () => {
              if (type === 'picked') {
                return {
                  text: 'Picked Up',
                  Icon: TickIcon,
                  bg: '#FFF5E3',
                  textColor: '#F59E0B',
                };
              }

              if (type === 'ready') {
                if (order.partner) {
                  return {
                    text: 'On the Way',
                    Icon: BikeIcon,
                    bg: '#FFFBEB',
                    textColor: '#F59E0B',
                  };
                }

                return {
                  text: 'Ready',
                  Icon: ReadyIcon,
                  bg: '#F4FFF7',
                  textColor: '#2F9C4D',
                };
              }

              return null;
            };

            const status = getStatusConfig();

            return (
              status && (
                <View
                  style={[styles.readyBadge, { backgroundColor: status.bg }]}
                >
                  <status.Icon
                    width={10}
                    height={10}
                    style={{ marginRight: 4 }}
                  />

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.readyText, { color: status.textColor }]}
                  >
                    {status.text}
                  </Text>
                </View>
              )
            );
          })()
        )}
      </View>

      {/* CUSTOMER */}
      <View style={styles.customerBox}>
        <CustomerIcon style={{ height: 16, width: 16, marginRight: 6 }} />
        <Text style={styles.customerText}>{order.customer}</Text>
      </View>

      {/* SUMMARY */}
      <Text style={styles.summary}>
        {order.items.length} Items | ₹{order.total} | {order.payment}
      </Text>

      <View style={styles.divider} />

      {/* ITEMS */}
      {type === 'preparing' && (
        <>
          {order.items.map((item, i) => (
            <Text key={i} style={styles.item}>
              • {item}
            </Text>
          ))}

          <View style={styles.divider} />
        </>
      )}

      {/*  Inject subcomponent here */}
      {children}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 0,
    position: 'relative',
    zIndex: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderId: {
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
    fontSize: 16 / fontScale,
  },

  time: {
    color: '#A1A1A1',
  },

  customerBox: {
    backgroundColor: '#E0EDFC',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',

    alignSelf: 'flex-start',
    maxWidth: '80%',
  },

  customerText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    flexShrink: 1,
  },

  summary: {
    marginTop: 6,
    color: '#5E5E5E',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  divider: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    marginVertical: 10,
  },

  item: {
    marginBottom: 4,
  },

  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 24,
    minWidth: 90, 
  },
  readyText: {
    color: '#2F9C4D',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
