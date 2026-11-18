import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScreenWrapper from '../../components/ScreenWrapper';
import StoreHeader from '../../components/StoreHeader';

import OrderCard from '../../components/OrderCard';
import PreparingContent from '../../components/PreparingContent';
import ReadyContent from '../../components/ReadyContent';
import PickedContent from '../../components/PickedContent';

import EmptyPreparing from '../../../assets/Images/no-orders.png';
import EmptyReady from '../../../assets/Images/no-ready.png';
import EmptyPicked from '../../../assets/Images/no-picked.png';

import { ordersData } from '../../../MockData/preparingData';
import { deliveryPartners } from '../../../MockData/readyData';
import { FONTS } from '../../../constants/common.constants';
import { DEVICE_HEIGHT, fontScale } from '../../utilities/Utils';
import TimerIcon from '../../../assets/svgComp/timer.svg';

import StarIcon from '../../../assets/svgComp/star.svg';
import LocationIcon from '../../../assets/svgComp/location.svg';
import CallIcon from '../../../assets/svgComp/call.svg';
import TickIcon from '../../../assets/svgComp/tick.svg';

const Tab = createMaterialTopTabNavigator();

/*  TIMER */
const PreparingTimer = ({ id, startTime, onComplete }: any) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsed = Math.floor((now - startTime) / 1000);
  const remaining = Math.max(180 - elapsed, 0);

  useEffect(() => {
    if (remaining === 0) {
      onComplete(id);
    }
  }, [remaining, id, onComplete]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;

  return (
    <View style={styles.timerBox}>
      <View style={styles.timerRow}>
        {/* ICON */}
        <TimerIcon width={12} height={14} style={{ marginRight: 8 }} />

        {/* TEXT */}
        <Text style={styles.timerText}>
          {`${m.toString().padStart(2, '0')} Minutes : ${s
            .toString()
            .padStart(2, '0')} Seconds`}
        </Text>
      </View>
    </View>
  );
};

export default function Order() {
  const [preparingOrders, setPreparingOrders] = useState(
    ordersData.preparing.map(o => ({
      ...o,
      startTime: Date.now(),
    })),
  );

  const [readyOrders, setReadyOrders] = useState(ordersData.ready);
  const [pickedOrders, setPickedOrders] = useState<any[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    readyOrders.forEach(order => {
      if (order.partner && !order.timeoutSet) {
        order.timeoutSet = true;

        setTimeout(() => {
          setReadyOrders(prev => prev.filter(o => o.id !== order.id));
          setPickedOrders(prev => [...prev, order]);
        }, 120000);
      }
    });
  }, [readyOrders]);

  const handleAutoMove = (id: string) => {
    setPreparingOrders(prev => {
      const order = prev.find(o => o.id === id);
      if (!order) return prev;

      setReadyOrders(r => {
        const assignedCount = r.filter(o => o.partner).length;

        let partner = null;
        if (assignedCount < deliveryPartners.length) {
          partner = deliveryPartners[assignedCount];
        }

        return [...r, { ...order, partner }];
      });

      return prev.filter(o => o.id !== id);
    });
  };

  const handleMarkReady = (id: string) => {
    handleAutoMove(id);
  };

  const EmptyScreen = ({ image, title, subtitle }: any) => (
    <View style={styles.emptyContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.noOrders}>{title}</Text>
      <Text style={styles.subText}>{subtitle}</Text>
    </View>
  );

  const PreparingScreen = () => {
    if (preparingOrders.length === 0) {
      return (
        <EmptyScreen
          image={EmptyPreparing}
          title="No Orders!"
          subtitle={'Orders that are getting prepared\nwill be shown here'}
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {preparingOrders.map(order => (
          <View key={order.id} style={styles.orderWrapper}>
            <OrderCard order={order} type="preparing">
              <PreparingContent
                order={order}
                onView={o => {
                  setSelectedOrder(o);
                  setShowModal(true);
                }}
                onMarkReady={handleMarkReady}
              />
            </OrderCard>

            <PreparingTimer
              id={order.id}
              startTime={order.startTime}
              onComplete={handleAutoMove}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  const ReadyScreen = () => {
    if (readyOrders.length === 0) {
      return (
        <EmptyScreen
          image={EmptyReady}
          title="No Ready Orders!"
          subtitle={'Orders marked as ready will\nappear here'}
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {readyOrders.map(order => (
          <View key={order.id} style={{ marginBottom: 16 }}>
            <OrderCard order={order} type="ready">
              <ReadyContent order={order} />
            </OrderCard>
          </View>
        ))}
      </ScrollView>
    );
  };

  const PickedUpScreen = () => {
    if (pickedOrders.length === 0) {
      return (
        <EmptyScreen
          image={EmptyPicked}
          title="No Picked Orders!"
          subtitle={'Picked up orders will be\nshown here'}
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {pickedOrders.map(order => (
          <View key={order.id} style={{ marginBottom: 16 }}>
            <OrderCard order={order} type="picked">
              <PickedContent
                order={order}
                onView={o => {
                  setSelectedOrder(o);
                  setShowModal(true);
                }}
              />
            </OrderCard>
          </View>
        ))}
      </ScrollView>
    );
  };

  const OrderTabs = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#0170F0' },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#E6E6E6',
      }}
    >
      {/* PREPARING */}
      <Tab.Screen
        name="Preparing"
        component={PreparingScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabLabel}>
              <Text
                style={[
                  styles.tabText,
                  { color: focused ? '#ffffff' : '#E6E6E6' },
                ]}
              >
                Preparing
              </Text>

              {preparingOrders.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{preparingOrders.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      {/* READY */}
      <Tab.Screen
        name="Ready"
        component={ReadyScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabLabel}>
              <Text
                style={[
                  styles.tabText,
                  { color: focused ? '#ffffff' : '#E6E6E6' },
                ]}
              >
                Ready
              </Text>

              {readyOrders.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{readyOrders.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      {/* PICKED */}
      <Tab.Screen
        name="Picked"
        component={PickedUpScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabLabel}>
              <Text
                style={[
                  styles.tabText,
                  { color: focused ? '#ffffff' : '#E6E6E6' },
                ]}
              >
                Picked Up
              </Text>

              {pickedOrders.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pickedOrders.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <StoreHeader
          storeName="ABC Store"
          isOnline={true}
          closingTime="12:00 pm, Today"
        />

        <OrderTabs />

        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <ScrollView
              style={styles.modalContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.dragHandle} />

              {selectedOrder && (
                <>
                  {/* HEADER */}
                  <View style={styles.modalHeader}>
                    <View>
                      <Text style={styles.modalTitle}>
                        Order ID: {selectedOrder.id}
                      </Text>
                      <Text style={styles.modalDate}>
                        Jan 08, 2026 • ₹{selectedOrder.total}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: selectedOrder.partner
                            ? '#FFF5E3'
                            : '#E0EDFC',
                        },
                      ]}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        {/* SHOW TICK ONLY FOR PICKED UP */}
                        {selectedOrder.partner && (
                          <TickIcon
                            width={12}
                            height={12}
                            style={{ marginRight: 4 }}
                          />
                        )}

                        <Text
                          style={[
                            styles.statusText,
                            {
                              color: selectedOrder.partner
                                ? '#F59E0B'
                                : '#0170F0',
                            },
                          ]}
                        >
                          {selectedOrder.partner ? 'Picked Up' : 'Preparing'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* CUSTOMER */}
                  <View style={styles.customerRow}>
                    {/* AVATAR */}
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {selectedOrder.customer
                          .split(' ')
                          .map(word => word[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </Text>
                    </View>

                    {/* CUSTOMER DETAILS */}
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.customerName}>
                        {selectedOrder.customer}
                      </Text>
                      <Text style={styles.customerPhone}>
                        {selectedOrder.phone}
                      </Text>
                    </View>
                  </View>

                  {/* ITEMS */}
                  <Text style={styles.sectionTitle}>ITEMS</Text>

                  {selectedOrder.items.map((item: string, i: number) => (
                    <View key={i} style={styles.itemRow}>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.itemName}>{item}</Text>
                    </View>
                  ))}

                  {/* BILLING */}
                  <Text style={styles.sectionTitle}>BILLING SUMMARY</Text>

                  <View style={styles.billRow}>
                    <Text>Items Total</Text>
                    <Text>₹{selectedOrder.total - 20}</Text>
                  </View>

                  <View style={styles.billRow}>
                    <Text>Delivery Charge</Text>
                    <Text>₹20</Text>
                  </View>

                  <View style={styles.dashedDivider} />

                  <View style={styles.billRow}>
                    <Text style={styles.totalText}>Total Amount</Text>
                    <Text style={styles.totalText}>₹{selectedOrder.total}</Text>
                  </View>

                  <View style={styles.billRow}>
                    <Text>Payment Method</Text>
                    <Text>{selectedOrder.payment}</Text>
                  </View>

                  {/* DELIVERY PARTNER (ONLY IF EXISTS) */}

                  {/* RATING + CALL */}
                  {selectedOrder.partner && (
                    <>
                      <Text style={styles.sectionTitle}>DELIVERY PARTNER</Text>

                      <View style={styles.partnerRow}>
                        <Text
                          style={{
                            fontSize: 16 / fontScale,
                            fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
                            color: '#222222',
                          }}
                        >
                          {selectedOrder.partner.name} (Delivery Partner)
                        </Text>
                        {/* RATING + CALL */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 2,
                          }}
                        >
                          <StarIcon width={12} height={12} />
                          <Text style={styles.partnerSub}>
                            {' '}
                            {selectedOrder.partner.rating} Ratings
                          </Text>

                          <Text style={styles.partnerSub}> | </Text>

                          <CallIcon
                            width={12}
                            height={12}
                            style={{ marginLeft: 4 }}
                          />
                          <Text
                            style={styles.callText}
                            onPress={() =>
                              Linking.openURL(
                                `tel:${selectedOrder.partner.phone}`,
                              )
                            }
                          >
                            {' '}
                            Call
                          </Text>
                        </View>

                        {/* PICKUP */}
                        <Text
                          style={{
                            fontSize: 12 / fontScale,
                            color: '#7A7A7A',
                            marginTop: 5,
                          }}
                        >
                          Picked up recently
                        </Text>

                        {/* LOCATION */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                          }}
                        >
                          <LocationIcon width={10} height={12} />
                          <Text
                            style={{
                              fontSize: 10 / fontScale,
                              fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
                              color: '#222222',
                              marginLeft: 4,
                            }}
                          >
                            Delivering to customer
                          </Text>
                        </View>
                      </View>
                    </>
                  )}

                  {/* BUTTON */}
                  {selectedOrder.partner ? (
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={() => setShowModal(false)}
                    >
                      <Text style={styles.primaryBtnText}>Close</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={() => {
                        handleMarkReady(selectedOrder.id);
                        setShowModal(false);
                      }}
                    >
                      <Text style={styles.primaryBtnText}>Mark As Ready</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 178, height: 178 },
  noOrders: {
    fontSize: 20 / fontScale,
    marginTop: 8,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    textAlign: 'center',
    justifyContent: 'center',
  },
  subText: {
    fontSize: 14 / fontScale,
    color: '#7A7A7A',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: '80%',
    alignSelf: 'center',
  },

  tabLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tabText: {
    // color: '#fff',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 14 / fontScale,
  },

  badge: {
    marginLeft: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  badgeText: {
    color: '#0170F0',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  /* TIMER STYLE */
  timerBox: {
    marginTop: -11,
    width: 310,
    height: 44,
    marginHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FF383C',
    backgroundColor: '#FDAEB0',
    alignItems: 'center',
    zIndex: 0,
  },

  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  orderWrapper: {
    marginBottom: 20,
  },

  timerText: {
    color: '#FF383C',
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 12 / fontScale,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 0,
    zIndex: 1,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: DEVICE_HEIGHT / 1.5,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 2,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222222',
  },

  modalDate: {
    color: '#7A7A7A',
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  statusBadge: {
    backgroundColor: '#E0EDFC',
    width: 88,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    color: '#0170F0',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 5,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0EDFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#5E5E5E',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  customerName: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#222222',
  },

  customerPhone: {
    fontSize: 12 / fontScale,
    color: '#5E5E5E',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
    backgroundColor: '#F9F9F9',
    marginLeft: 6,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  dot: {
    marginRight: 6,
    color: '#0170F0',
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  itemName: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#222222',
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  partnerRow: {
    marginLeft: 10,
  },

  totalText: {
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    fontSize: 14 / fontScale,
    color: '#222222',
  },

  partnerSub: {
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED,
    color: '#5E5E5E',
  },
  callText: {
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 10 / fontScale,
    color: '#0170F0',
  },

  dashedDivider: {
    borderWidth: 0.7,
    borderColor: '#7A7A7A',
    borderStyle: 'dashed',
    marginVertical: 10,
  },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: '#0170F0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  smallText: {
    fontSize: 12 / fontScale,
    color: '#7A7A7A',
    marginTop: 4,
  },
});
