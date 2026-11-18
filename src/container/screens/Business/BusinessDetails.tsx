import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader2 from '../../components/CommonHeader2';
import DeliveredOrderCard from '../../components/DeliveredOrderCard';
import MoreIcon from '../../../assets/svgComp/more.svg';

import { deliveredOrders } from '../../../MockData/deliveredOrders';
import BusinessOverviewCard from '../../components/BusinessOverviewCard';
import {
  businessOverview,
  businessReportData,
  performanceIndicators,
  revenueByCategory,
  weeklyPerformance,
} from '../../../MockData/BusinessData';

import ShareIcon from '../../../assets/svgComp/share.svg';
import NotificationIcon from '../../../assets/svgComp/bell.svg';
import SettingIcon from '../../../assets/svgComp/settings2.svg';
import SupportIcon from '../../../assets/svgComp/support.svg';
import ReportIcon from '../../../assets/svgComp/report.svg';
import DownloadIcon from '../../../assets/svgComp/download.svg';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';
import BusinessReportCard from '../../components/BusinessReportCard';
import RevenueByCategoryCard from '../../components/RevenueByCategoryCard';
import WeeklyPerformanceCard from '../../components/WeeklyPerformanceCard';
import PerformanceIndicatorsCard from '../../components/PerformanceIndicatorCard';

const BusinessDetails = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Share Business');
  const [screenMode, setScreenMode] = useState('business');

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader2
        title="Business Details"
        RightIcon={MoreIcon}
        onRightPress={() => setShowMenu(true)}
      />

      <View style={styles.blueSection}>
        <BusinessOverviewCard
          storeName={businessOverview.storeName}
          status={businessOverview.status}
          closingTime={businessOverview.closingTime}
          rating={businessOverview.rating}
          completion={businessOverview.completion}
          orders={businessOverview.orders}
        />
      </View>

      {screenMode === 'business' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {deliveredOrders.map(item => (
            <DeliveredOrderCard key={item.id} order={item} />
          ))}
        </ScrollView>
      )}

      {screenMode === 'reports' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Reports Content */}
          <BusinessReportCard data={businessReportData} />

          <RevenueByCategoryCard data={revenueByCategory} />

          <WeeklyPerformanceCard data={weeklyPerformance} />

          <PerformanceIndicatorsCard
            deliverySuccessRate={performanceIndicators.deliverySuccessRate}
            cancellationRate={performanceIndicators.cancellationRate}
            averageOrderValue={performanceIndicators.averageOrderValue}
          />

          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => {
              console.log('Download Report');
            }}
          >
            <DownloadIcon width={18} height={18} />

            <Text style={styles.downloadBtnText}>Download Report</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setShowMenu(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.dropdownContainer}
            onPress={() => {}}
          >
            {/* Share Business */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === 'Share Business' && styles.activeMenuItem,
              ]}
              onPress={() => {
                setSelectedMenu('Share Business');
                setScreenMode('business');
                setShowMenu(false);
              }}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedMenu === 'Share Business' &&
                    styles.activeIconContainer,
                ]}
              >
                <ShareIcon width={14} height={14} />
              </View>

              <Text
                style={
                  selectedMenu === 'Share Business'
                    ? styles.activeMenuText
                    : styles.menuText
                }
              >
                Share Business
              </Text>
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === 'Notifications' && styles.activeMenuItem,
              ]}
              onPress={() => setSelectedMenu('Notifications')}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedMenu === 'Notifications' &&
                    styles.activeIconContainer,
                ]}
              >
                <NotificationIcon width={14} height={14} />
              </View>

              <Text
                style={
                  selectedMenu === 'Notifications'
                    ? styles.activeMenuText
                    : styles.menuText
                }
              >
                Notifications
              </Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === 'Settings' && styles.activeMenuItem,
              ]}
              onPress={() => setSelectedMenu('Settings')}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedMenu === 'Settings' && styles.activeIconContainer,
                ]}
              >
                <SettingIcon width={14} height={14} />
              </View>

              <Text
                style={
                  selectedMenu === 'Settings'
                    ? styles.activeMenuText
                    : styles.menuText
                }
              >
                Settings
              </Text>
            </TouchableOpacity>

            {/* Support */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === 'Support' && styles.activeMenuItem,
              ]}
              onPress={() => setSelectedMenu('Support')}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedMenu === 'Support' && styles.activeIconContainer,
                ]}
              >
                <SupportIcon width={14} height={14} />
              </View>

              <Text
                style={
                  selectedMenu === 'Support'
                    ? styles.activeMenuText
                    : styles.menuText
                }
              >
                Support
              </Text>
            </TouchableOpacity>

            {/* Reports */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === 'Reports' && styles.activeMenuItem,
              ]}
              onPress={() => {
                setSelectedMenu('Reports');
                setScreenMode('reports');
                setShowMenu(false);
              }}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedMenu === 'Reports' && styles.activeIconContainer,
                ]}
              >
                <ReportIcon width={14} height={14} />
              </View>

              <Text
                style={
                  selectedMenu === 'Reports'
                    ? styles.activeMenuText
                    : styles.menuText
                }
              >
                Reports
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScreenWrapper>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  blueSection: {
    backgroundColor: '#0170F0',
    paddingBottom: 16,
  },
  modalOverlay: {
    flex: 1,
  },

  dropdownContainer: {
    position: 'absolute',
    top: 30,
    right: 16,
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  activeMenuItem: {
    backgroundColor: '#E0EDFC',
    marginHorizontal: 6,
    borderRadius: 8,
  },

  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeIconContainer: {
    backgroundColor: '#D6E7FF',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333333',
  },

  activeMenuText: {
    marginLeft: 12,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#0170F0',
  },

  downloadBtn: {
    height: 50,
    backgroundColor: '#0170F0',
    borderRadius: 12,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 24,
    marginHorizontal: 4,
    marginBottom: 8,
  },

  downloadBtnText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
