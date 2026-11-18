import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader from '../../components/CommonHeader';

import PrivacyIcon from '../../../assets/svgComp/privacy.svg';
import InfoIcon from '../../../assets/svgComp/info.svg';
import MailIcon from '../../../assets/svgComp/mail.svg';
import EmailIcon from '../../../assets/svgComp/email.svg';
import CallerIcon from '../../../assets/svgComp/caller.svg';

import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const TermsPolicies = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Terms & Policies" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Top Card */}
        <View style={styles.topCard}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <PrivacyIcon width={18} height={21} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Your Privacy Matters</Text>
              <Text style={styles.date}>Last Updated: January 24, 2025</Text>

              <Text style={styles.desc}>
                We are committed to protecting your privacy and ensuring the
                security of your personal information.
              </Text>
            </View>
          </View>
        </View>

        {/* Info Card 1*/}
        <View style={styles.infoCard}>
          <View style={styles.row}>
            <View style={styles.iconInfoContainer}>
              <InfoIcon width={12} height={12} />
            </View>
            <Text style={styles.infoTitle}>Information We Collect</Text>
          </View>

          <Text style={styles.bullet}>
            • We collect information you provide directly to us, including your
            name, email address, phone number, business details, and payment
            information.
          </Text>

          <Text style={styles.bullet}>
            • We automatically collect certain information about your device
            when you use our platform, including IP address, browser type, and
            usage data.
          </Text>

          <Text style={styles.bullet}>
            • Location data is collected to provide location-based services and
            improve delivery accuracy.
          </Text>
        </View>

        {/* Info Card 2 */}
        <View style={styles.infoCard}>
          <View style={styles.row}>
            <View style={styles.iconInfoContainer}>
              <InfoIcon width={12} height={12} />
            </View>
            <Text style={styles.infoTitle}>How we use your information</Text>
          </View>

          <Text style={styles.bullet}>
            • To provide, maintain and improve our services
          </Text>

          <Text style={styles.bullet}>
            • To process transactions and send related information
          </Text>

          <Text style={styles.bullet}>
            • To send you technical notices, updates and support messages
          </Text>

          <Text style={styles.bullet}>
            • To respond to your comments and questions
          </Text>

          <Text style={styles.bullet}>
            • To monitor and analyze trends, usage and activities
          </Text>
        </View>

        {/* Info Card 3 */}
        <View style={styles.infoCard}>
          <View style={styles.row}>
            <View style={styles.iconInfoContainer}>
              <InfoIcon width={12} height={12} />
            </View>
            <Text style={styles.infoTitle}>Information sharing</Text>
          </View>

          <Text style={styles.bullet}>
            • We do not sell your personal information to third parties.
          </Text>

          <Text style={styles.bullet}>
            • We may share information with service providers who perform
            services on our behalf.
          </Text>

          <Text style={styles.bullet}>
            • We may share information when required by law or to protect our
            rights.
          </Text>

          <Text style={styles.bullet}>
            • Bussiness transfers: information may be transferred in connection
            with a merger or acquisition.
          </Text>
        </View>

        {/* CONTACT CARD */}
        <View style={styles.infoCard}>
          <View style={styles.row}>
            <View
              style={{
                ...styles.iconInfoContainer,
                backgroundColor: '#FFF9EF',
              }}
            >
              <MailIcon width={12} height={12} />
            </View>
            <Text style={styles.infoTitle}>Contact Us</Text>
          </View>

          <View>
            <Text style={styles.bullet}>
              • If you have any questions about this Privacy Policy, please
              contact us at
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <EmailIcon width={15} height={12} />
              <Text style={styles.contactText}>privacy@buraq.com</Text>
            </View>

            <View style={styles.contactRow}>
              <CallerIcon width={13} height={13} />
              <Text style={styles.contactText}>+92 300 1234567</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default TermsPolicies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  topCard: {
    backgroundColor: '#F6FAFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#0170F0',
    marginBottom: 16,
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconContainer: {
    width: 39,
    height: 39,
    borderRadius: 4,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222222',
  },

  date: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#919191',
    marginTop: 4,
    marginBottom: 8,
  },

  desc: {
    fontSize: 12 / fontScale,
    color: '#535353',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    lineHeight: 17,
  },

  infoTitle: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    marginLeft: 10,
    color: '#333333',
  },
  iconInfoContainer: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#E0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    fontSize: 12 / fontScale,
    color: '#595959',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    lineHeight: 19,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    marginTop: 16,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  contactText: {
    marginLeft: 10,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#0170F0',
  },
});
