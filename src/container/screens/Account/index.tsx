import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import StoreInfoCard from '../../components/StoreInfoCard';

import { DEVICE_WIDTH, fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';
import { storeInfo } from '../../../MockData/storeInfo';

import HelpIcon from '../../../assets/svgComp/help.svg';
import TermsIcon from '../../../assets/svgComp/terms.svg';
import SettingsIcon from '../../../assets/svgComp/settings.svg';
import LogoutIcon from '../../../assets/svgComp/logout.svg';
import ArrowIcon from '../../../assets/svgComp/arrow.svg';

import { useStore } from '../../store/useStore';

const Account = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = useStore(state => state.logout);

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Account</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <StoreInfoCard {...storeInfo} />

        {/* First Box */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.leftRow}>
              <HelpIcon width={20} height={20} />
              <Text style={styles.rowText}>Store Opened</Text>
            </View>

            <Switch value={isOpen} onValueChange={setIsOpen} />
          </View>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('BusinessDetails')}
          >
            <View style={styles.leftRow}>
              <TermsIcon width={20} height={20} />
              <Text style={styles.rowText}>Business Details</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('SubscriptionPlan')}
          >
            <View style={styles.leftRow}>
              <SettingsIcon width={20} height={20} />
              <Text style={styles.rowText}>Subscription Plan</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <View style={styles.leftRow}>
              <LogoutIcon width={20} height={20} />
              <Text style={styles.rowText}>Payment History</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>
        </View>

        {/* Second Box */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <View style={styles.leftRow}>
              <HelpIcon width={20} height={20} />
              <Text style={styles.rowText}>Help & Support</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('TermsPolicies')}
          >
            <View style={styles.leftRow}>
              <TermsIcon width={20} height={20} />
              <Text style={styles.rowText}>Terms & Policies</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.leftRow}>
              <SettingsIcon width={20} height={20} />
              <Text style={styles.rowText}>Settings</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => setShowLogoutModal(true)}
          >
            <View style={styles.leftRow}>
              <LogoutIcon width={20} height={20} />
              <Text style={styles.rowText}>Log Out</Text>
            </View>

            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showLogoutModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragLine} />

            <Text style={styles.logoutTitle}>Logout</Text>

            <Text style={styles.logoutText}>
              Are you sure you want to logout
            </Text>

            <Text style={styles.logoutText}>from your account?</Text>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                logout();
                setShowLogoutModal(false);
              }}
            >
              <Text style={styles.logoutBtnText}>Yes, Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  header: {
    backgroundColor: '#0170F0',
    width: DEVICE_WIDTH,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  headerText: {
    color: '#FFFFFF',
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowText: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333333',
    marginLeft: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 35,
  },

  dragLine: {
    width: 60,
    height: 5,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 28,
  },

  logoutTitle: {
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
    textAlign: 'center',
  },

  logoutText: {
    textAlign: 'center',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#636363',
    marginTop: 2,
  },

  logoutBtn: {
    backgroundColor: '#0170F0',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 30,
  },

  logoutBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  cancelBtn: {
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 16,
  },

  cancelText: {
    textAlign: 'center',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#535353',
  },
});
