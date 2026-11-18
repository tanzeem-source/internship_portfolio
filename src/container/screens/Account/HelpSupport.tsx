import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
  TextInput,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader from '../../components/CommonHeader';

import HelpIcon from '../../../assets/svgComp/helpBox.svg';
import CallIcon from '../../../assets/svgComp/call.svg';
import EmailIcon from '../../../assets/svgComp/email.svg';
import ArrowIcon from '../../../assets/svgComp/arrowDown.svg';

import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

import { useFormik } from 'formik';

const faqs = [
  {
    question: 'How do I receive my payouts?',
    answer:
      'Payments are transferred weekly directly to your registered bank account.',
  },
  {
    question: 'How do I shift orders to prepare tab?',
    answer: 'Accept the order from incoming orders to shift it.',
  },
  {
    question: 'How do I update my menu and prices?',
    answer: 'Go to Items tab and update products anytime.',
  },
  {
    question: 'How do I handle order cancellation?',
    answer: 'Cancel from order details before preparation starts.',
  },
  {
    question: 'Can I temporarily close my store?',
    answer: 'Yes, disable Store Opened from Account screen.',
  },
];

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const handleCall = () => {
    Linking.openURL('tel:+919681374200');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@buraq.com');
  };

  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
    },

    onSubmit: values => {
      console.log(values);
      setShowModal(false);
      formik.resetForm();
    },
  });

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Help & Support" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Help Box */}
        <View style={styles.helpBox}>
          <View style={{ ...styles.iconContainer, backgroundColor: '#FF8D28' }}>
            <HelpIcon width={22} height={22} />
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpSub}>Available 24/7 For You</Text>
            <Text style={styles.helpDesc}>
              Our support team is always ready to assist you{'\n'}
              with any questions or issues.
            </Text>
          </View>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
            <CallIcon width={18} height={18} />
            <Text style={styles.contactTitle}>Call Support</Text>
            <Text style={styles.contactText}>Talk to our team</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
            <EmailIcon width={18} height={18} />
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactText}>support@buraq.com</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

        {faqs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqCard}
            onPress={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <View style={styles.faqRow}>
              <Text style={styles.question}>{item.question}</Text>

              <ArrowIcon
                width={12}
                height={12}
                style={{
                  transform: [
                    {
                      rotate: openIndex === index ? '180deg' : '0deg',
                    },
                  ],
                }}
              />
            </View>

            {openIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.supportBox}>
          <View style={styles.supportTop}>
            <View style={styles.iconContainer}>
              <HelpIcon width={16} height={20} />
            </View>

            <View style={{ marginLeft: 14 }}>
              <Text style={styles.supportTitle}>Still Need Help?</Text>

              <Text style={styles.supportText}>
                Can't find what you're looking for?
              </Text>

              <Text style={styles.supportText}>
                Send us a message and we'll get back
              </Text>

              <Text style={styles.supportText}>to you soon.</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.supportBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16 / fontScale,
                fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
              }}
            >
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragLine} />

            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Support</Text>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Subject */}
            <Text style={styles.label}>Subject</Text>

            <TextInput
              style={styles.inputBox}
              placeholder="What do you need help with?"
              value={formik.values.subject}
              onChangeText={formik.handleChange('subject')}
            />

            {/* Message */}
            <Text style={styles.label}>Message</Text>

            <TextInput
              style={styles.messageBox}
              placeholder="Describe you issue in detail...."
              multiline
              value={formik.values.message}
              onChangeText={formik.handleChange('message')}
            />

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                {
                  backgroundColor:
                    formik.values.subject.trim() && formik.values.message.trim()
                      ? '#0170F0'
                      : '#E6E6E6',
                },
              ]}
              disabled={
                !formik.values.subject.trim() || !formik.values.message.trim()
              }
              onPress={formik.handleSubmit}
            >
              <Text style={styles.submitText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  helpBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EE',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF8D28',
  },

  helpTitle: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    lineHeight: 19,
    color: '#222222',
  },

  helpSub: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#919191',
    marginTop: 2,
  },

  helpDesc: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#535353',
    marginTop: 6,
    lineHeight: 17,
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  contactCard: {
    width: '48%',
    backgroundColor: '#FDFDFD',
    borderRadius: 8,
    padding: 16,
  },

  contactTitle: {
    marginTop: 12,
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  contactText: {
    color: '#636363',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    marginTop: 3,
  },

  faqTitle: {
    margin: 18,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    fontSize: 16 / fontScale,
    color: '#333333',
  },

  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },

  faqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  question: {
    flex: 1,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 14 / fontScale,
    color: '#333333',
  },

  answer: {
    marginTop: 12,
    color: '#535353',
    lineHeight: 20,
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  supportBox: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 18,
    marginBottom: 10,
  },

  iconContainer: {
    width: 39,
    height: 39,
    borderRadius: 4,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  supportTitle: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#222222',
  },

  supportText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#535353',
    lineHeight: 17,
    marginTop: 4,
  },

  supportBtn: {
    marginTop: 20,
    backgroundColor: '#0170F0',
    padding: 15,
    margin: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  supportBtnText: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  dragLine: {
    width: 60,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  closeBtn: {
    fontSize: 24,
  },

  label: {
    marginBottom: 10,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  inputBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  messageBox: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    textAlignVertical: 'top',
    marginBottom: 24,
  },

  submitBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },
});
