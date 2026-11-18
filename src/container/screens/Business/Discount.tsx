import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader2 from '../../components/CommonHeader2';

import DiscountIcon from '../../../assets/svgComp/discount2.svg';
import DiscountCard from '../../components/DiscountCard';
import { discounts } from '../../../MockData/discounts';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { DEVICE_HEIGHT, fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

const Discount = () => {
  const [showModal, setShowModal] = useState(false);

  const [discountList, setDiscountList] = useState(discounts);

  const formik = useFormik({
    initialValues: {
      discountType: 'Percentage',
      discountName: '',
      percentage: '',
      minOrder: '',
      maxDiscount: '',
      usageLimit: '',
      startDate: '',
      endDate: '',
      description: '',
    },

    validate: values => {
      const errors: any = {};

      if (!values.discountType) errors.discountType = true;
      if (!values.discountName) errors.discountName = true;
      if (!values.percentage) errors.percentage = true;
      if (!values.minOrder) errors.minOrder = true;
      if (!values.maxDiscount) errors.maxDiscount = true;
      if (!values.usageLimit) errors.usageLimit = true;
      if (!values.startDate) errors.startDate = true;
      if (!values.endDate) errors.endDate = true;

      return errors;
    },

    onSubmit: values => {
      const newDiscount = {
        id: Date.now(),

        discountName: values.discountName,

        discountPercent:
          values.discountType === 'Percentage'
            ? Number(values.percentage)
            : Number(values.percentage),

        minOrder: Number(values.minOrder),

        maxDiscount: Number(values.maxDiscount),

        usageLimit: Number(values.usageLimit),

        usedCount: 0,

        startDate: values.startDate,

        endDate: values.endDate,

        status: 'Active',

        description: values.description,
      };

      setDiscountList(prev => [newDiscount, ...prev]);

      formik.resetForm();

      setShowModal(false);
    },
  });

  const isFormValid =
    formik.values.discountName.trim() !== '' &&
    formik.values.percentage.trim() !== '' &&
    formik.values.minOrder.trim() !== '' &&
    formik.values.maxDiscount.trim() !== '' &&
    formik.values.usageLimit.trim() !== '' &&
    formik.values.startDate.trim() !== '' &&
    formik.values.endDate.trim() !== '';

  const handleDeleteDiscount = id => {
    setDiscountList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader2
        title="Discount"
        RightIcon={DiscountIcon}
        onRightPress={() => setShowModal(true)}
      />

      <ScrollView>
        {discountList.map(item => (
          <DiscountCard
            key={item.id}
            {...item}
            onDelete={() => handleDeleteDiscount(item.id)}
          />
        ))}
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Discount</Text>

              <TouchableOpacity
                onPress={() => {
                  formik.resetForm();
                  setShowModal(false);
                }}
              >
                <Text style={{ fontSize: 20 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Discount Name *</Text>

              <TextInput
                style={styles.input}
                value={formik.values.discountName}
                onChangeText={formik.handleChange('discountName')}
                placeholder="e.g. SAVE20"
              />

              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Percentage (%) *</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formik.values.percentage}
                    onChangeText={formik.handleChange('percentage')}
                  />
                </View>

                <View style={styles.half}>
                  <Text style={styles.label}>Min Order (₹) *</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formik.values.minOrder}
                    onChangeText={formik.handleChange('minOrder')}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Max Discount *</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formik.values.maxDiscount}
                    onChangeText={formik.handleChange('maxDiscount')}
                  />
                </View>

                <View style={styles.half}>
                  <Text style={styles.label}>Usage Limit *</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formik.values.usageLimit}
                    onChangeText={formik.handleChange('usageLimit')}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Start Date</Text>

                  <TextInput
                    style={styles.input}
                    value={formik.values.startDate}
                    onChangeText={formik.handleChange('startDate')}
                    placeholder="DD/MM/YYYY"
                  />
                </View>

                <View style={styles.half}>
                  <Text style={styles.label}>End Date</Text>

                  <TextInput
                    style={styles.input}
                    value={formik.values.endDate}
                    onChangeText={formik.handleChange('endDate')}
                    placeholder="DD/MM/YYYY"
                  />
                </View>
              </View>

              <Text style={styles.label}>Description</Text>

              <TextInput
                multiline
                style={styles.description}
                value={formik.values.description}
                onChangeText={formik.handleChange('description')}
              />

              <TouchableOpacity
                disabled={!isFormValid}
                onPress={formik.handleSubmit}
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: isFormValid ? '#0170F0' : '#EFEFEF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.submitText,
                    {
                      color: isFormValid ? '#FFFFFF' : '#9E9E9E',
                    },
                  ]}
                >
                  Add Discount
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default Discount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: DEVICE_HEIGHT / 1.3,
  },

  dragHandle: {
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 16,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
  },

  label: {
    marginBottom: 6,
    marginTop: 12,
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#333333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  description: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 12,
    minHeight: 100,
    padding: 12,
    textAlignVertical: 'top',
  },

  submitBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },

  submitText: {
    color: '#FFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
