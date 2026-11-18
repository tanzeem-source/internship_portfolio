import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import { useFormik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

import ScreenWrapper from '../../components/ScreenWrapper';
import StoreHeader from '../../components/StoreHeader';

import PlusIcon from '../../../assets/svgComp/plus.svg';
import BluePlusIcon from '../../../assets/svgComp/blue-plus.svg';

import BulbIcon from '../../../assets/svgComp/bulb.svg';
import ImagePlaceholder from '../../../assets/svgComp/image-placeholder.svg';

import { DEVICE_HEIGHT, fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

import CrossIcon from '../../../assets/svgComp/cross.svg';

import { pick, types } from '@react-native-documents/picker';

import { FlatList, Switch } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const handleUploadExcel = async () => {
  try {
    const result = await pick({
      type: [types.xls, types.xlsx],
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const ItemCard = ({
  item,
  onToggle,
}) => (
  <View style={styles.itemCard}>
    <Image
      source={{ uri: item.image }}
      style={styles.itemImage}
    />

    <View
      style={{
        flex: 1,
        marginLeft: 12,
      }}
    >
      <Text style={styles.itemName}>
        {item.name}
      </Text>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#E6E6E6',
          borderStyle: 'dashed',
          marginVertical: 8,
        }}
      />

      <Text style={styles.itemPrice}>
        ₹ {item.calculatedPrice}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Text
          style={{
            fontSize:
              12 / fontScale,
            fontFamily:
              FONTS.SF_PRO_ROUNDED_SEMIBOLD,
            color: '#7A7A7A',
          }}
        >
          MRP{' '}
          <Text
            style={{
              textDecorationLine:
                'line-through',
            }}
          >
            ₹{item.price}
          </Text>
        </Text>

        <Text
          style={{
            fontSize:
              12 / fontScale,
            color: '#7A7A7A',
            fontFamily:
              FONTS.SF_PRO_ROUNDED_REGULAR,
            marginLeft: 6,
          }}
        >
          (incl. of all taxes)
        </Text>
      </View>

      <Text
        style={{
          marginTop: 6,
          color: item.enabled
            ? '#00A651'
            : '#FF3B30',
          fontSize:
            12 / fontScale,
          fontFamily:
            FONTS.SF_PRO_ROUNDED_MEDIUM,
        }}
      >
        {item.enabled
          ? 'In Stock'
          : 'Out of Stock'}
      </Text>
    </View>

    <Switch
      value={item.enabled}
      onValueChange={() =>
        onToggle(item.name)
      }
    />
  </View>
);

const ItemList = ({ route }) => {
  const { items, category, searchText } = route.params;

  let filteredItems =
    category === 'All'
      ? items
      : items.filter(item => item.category === category);

  filteredItems = filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
      <FlatList
        data={filteredItems}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <ItemCard item={item} onToggle={route.params.onToggle} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};

const TabContent = ({
  items,
  category,
  searchText,
  setModalVisible,
  onToggle,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          marginHorizontal: 16,
          marginTop: 20,
          height: 52,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: '#0170F0',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#fff',
        }}
      >
        <BluePlusIcon width={14} height={14} color="#0170F0" />

        <Text
          style={{
            marginLeft: 8,
            color: '#0170F0',
            fontSize: 16 / fontScale,
            fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
          }}
        >
          Add Items
        </Text>
      </TouchableOpacity>

      <ItemList
        route={{
          params: {
            items,
            category,
            searchText,
            onToggle,
          },
        }}
      />
    </View>
  );
};

const ItemsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [itemImage, setItemImage] = useState(null);

  const [items, setItems] = useState([]);

  const [searchText, setSearchText] = useState('');

  const toggleItem = name => {
    setItems(prev =>
      prev.map(item =>
        item.name === name
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item,
      ),
    );
  };

  // image picker function
  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.assets?.length) {
          setItemImage(response.assets[0]);
        }
      },
    );
  };

  const categoryData = [
    { label: 'Grocery', value: 'grocery' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Pharmacy', value: 'pharmacy' },
    { label: 'Home Decor', value: 'home_decor' },
    { label: 'Cosmetics', value: 'cosmetics' },
  ];

  const unitsData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      units: '',
      stock: '',
      price: '',
      discount: '',
      calculatedPrice: '',
      description: '',
    },

    validate: values => {
      const errors: any = {};

      if (!values.name) errors.name = true;
      if (!values.category) errors.category = true;
      if (!values.units) errors.units = true;
      if (!values.stock) errors.stock = true;
      if (!values.price) errors.price = true;
      if (!values.discount) errors.discount = true;
      if (!values.calculatedPrice) {
        errors.calculatedPrice = true;
      }

      return errors;
    },

    onSubmit: values => {
      const newItem = {
        ...values,
        image: itemImage?.uri,
        enabled: true,
      };

      setItems(prev => [...prev, newItem]);

      formik.resetForm();
      setItemImage(null);
      setModalVisible(false);
    },
  });

  const calculateDiscountedPrice = (price: string, discount: string) => {
    if (!price || !discount) return '';

    const actualPrice = parseFloat(price);
    const discountPercent = parseFloat(discount);

    if (isNaN(actualPrice) || isNaN(discountPercent)) return '';

    const finalPrice = actualPrice - (actualPrice * discountPercent) / 100;

    return finalPrice.toFixed(2);
  };

  const isFormValid =
    formik.values.name &&
    formik.values.category &&
    formik.values.units &&
    formik.values.stock &&
    formik.values.price &&
    formik.values.discount &&
    formik.values.calculatedPrice;

  return (
    <ScreenWrapper>
      {/* Fixed Header */}
      <StoreHeader
        storeName="ABC Store"
        isOnline={true}
        closingTime="12:00 pm, Today"
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* Scrollable Content */}
      <View style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.contentContainer}>
            <Image
              source={require('../../../assets/Images/empty-items.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>No Items Yet!</Text>

            <Text style={styles.subtitle}>
              Added items will show{'\n'}up here.
            </Text>

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 20 }]}
              onPress={() => setModalVisible(true)}
            >
              <PlusIcon width={12} height={12} />
              <Text style={styles.addButtonText}>Add Items</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadExcel}
            >
              <Text style={styles.uploadButtonText}>Upload Excel Sheet</Text>
            </TouchableOpacity>

            <View style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <BulbIcon width={18} height={18} />
                <Text style={styles.tipTitle}>Quick Tip</Text>
              </View>

              <Text style={styles.tipText}>
                You can add items manually or save time by {'\n'}
                uploading an Excel file with all your
                {'\n'}products at once
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {/* Tabs */}
            <View style={{ flex: 1 }}>
              <Tab.Navigator
                screenOptions={{
                  tabBarScrollEnabled: true,

                  tabBarStyle: {
                    backgroundColor: '#0170F0',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderRadius: 0,
                    height: 70,
                  },

                  tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                  },

                  tabBarLabelStyle: {
                    fontSize: 12 / fontScale,
                    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
                    marginVertical: 0,
                  },

                  tabBarActiveTintColor: '#fff',
                  tabBarInactiveTintColor: '#D8E8FF',

                  tabBarShowIcon: true,
                }}
              >
                <Tab.Screen
                  name="All"
                  children={() => (
                    <TabContent
                      items={items}
                      category="All"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />

                <Tab.Screen
                  name="Grocery"
                  children={() => (
                    <TabContent
                      items={items}
                      category="grocery"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />

                <Tab.Screen
                  name="Electronics"
                  children={() => (
                    <TabContent
                      items={items}
                      category="electronics"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />

                <Tab.Screen
                  name="Pharmacy"
                  children={() => (
                    <TabContent
                      items={items}
                      category="pharmacy"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />

                <Tab.Screen
                  name="Decor"
                  children={() => (
                    <TabContent
                      items={items}
                      category="home_decor"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />

                <Tab.Screen
                  name="Cosmetics"
                  children={() => (
                    <TabContent
                      items={items}
                      category="cosmetics"
                      searchText={searchText}
                      setModalVisible={setModalVisible}
                      onToggle={toggleItem}
                    />
                  )}
                />
              </Tab.Navigator>
            </View>
          </View>
        )}

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.dragLine} />

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Item</Text>

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <CrossIcon width={13.5} height={13.5} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Upload */}
                <TouchableOpacity
                  style={styles.imageUploadBox}
                  onPress={handlePickImage}
                >
                  {itemImage ? (
                    <Image
                      source={{ uri: itemImage.uri }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 12,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <>
                      <ImagePlaceholder width={29} height={29} />

                      <Text style={styles.uploadImageText}>Add Image</Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Name */}
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                />

                {/* Category + Units */}
                <View style={styles.row}>
                  <Dropdown
                    style={styles.halfInput}
                    data={categoryData}
                    labelField="label"
                    valueField="value"
                    placeholder="Select a Category"
                    value={formik.values.category}
                    onChange={item =>
                      formik.setFieldValue('category', item.value)
                    }
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownText}
                    itemTextStyle={styles.dropdownItemText}
                  />

                  <Dropdown
                    style={styles.halfInput}
                    data={unitsData}
                    labelField="label"
                    valueField="value"
                    placeholder="Units"
                    value={formik.values.units}
                    onChange={item => formik.setFieldValue('units', item.value)}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownText}
                    itemTextStyle={styles.dropdownItemText}
                  />
                </View>

                {/* Stock + Price */}
                <View style={styles.row}>
                  <TextInput
                    placeholder="Stock Quantity"
                    style={styles.halfInput}
                    value={formik.values.stock}
                    onChangeText={formik.handleChange('stock')}
                  />

                  <TextInput
                    placeholder="Actual Price (₹)"
                    style={styles.halfInput}
                    keyboardType="numeric"
                    value={formik.values.price}
                    onChangeText={text => {
                      formik.handleChange('price')(text);

                      const price = Number(text);
                      const discount = Number(formik.values.discount);

                      if (price && discount >= 0) {
                        const finalPrice = price - (price * discount) / 100;

                        formik.setFieldValue(
                          'calculatedPrice',
                          finalPrice.toFixed(0),
                        );
                      }
                    }}
                  />
                </View>

                {/* Discount + Calculated */}
                <View style={styles.row}>
                  <TextInput
                    placeholder="Discount (%)"
                    style={styles.halfInput}
                    keyboardType="numeric"
                    value={formik.values.discount}
                    onChangeText={text => {
                      formik.handleChange('discount')(text);

                      const price = Number(formik.values.price);
                      const discount = Number(text);

                      if (price && discount >= 0) {
                        const finalPrice = price - (price * discount) / 100;

                        formik.setFieldValue(
                          'calculatedPrice',
                          finalPrice.toFixed(0),
                        );
                      }
                    }}
                  />

                  <TextInput
                    placeholder="Price Calculated (₹)"
                    style={styles.halfInput}
                    keyboardType="numeric"
                    value={formik.values.calculatedPrice}
                    editable={false}
                  />
                </View>

                {/* Description */}
                <TextInput
                  placeholder="Description (Optional)"
                  multiline
                  style={styles.descriptionInput}
                  value={formik.values.description}
                  onChangeText={formik.handleChange('description')}
                />

                {/* Submit */}
                <TouchableOpacity
                  disabled={!isFormValid}
                  onPress={formik.handleSubmit}
                  style={[
                    styles.submitBtn,
                    {
                      backgroundColor: isFormValid ? '#0170F0' : '#E6E6E6',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.submitText,
                      {
                        color: isFormValid ? '#fff' : '#9E9E9E',
                      },
                    ]}
                  >
                    Add Item
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  image: {
    width: 147,
    height: 140,
  },

  title: {
    marginTop: 10,
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#222222',
  },

  subtitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#7A7A7A',
    lineHeight: 20,
  },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  itemImage: {
    width: 93,
    height: 96,
    borderRadius: 4,
    marginRight: 12,
  },

  itemName: {
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 16 / fontScale,
    color: '#222222',
  },

  itemCategory: {
    color: '#7A7A7A',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  itemPrice: {
    color: '#222222',
    marginTop: 4,
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  addButton: {
    width: 285,
    height: 51,
    backgroundColor: '#0170F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    marginLeft: 6,
  },

  uploadButton: {
    width: 285,
    height: 51,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#0170F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#FFFFFF',
  },

  uploadButtonText: {
    color: '#222222',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  tipCard: {
    width: '100%',
    backgroundColor: '#E0EDFC',
    borderRadius: 12 / fontScale,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 28,
  },

  tipTitle: {
    marginLeft: 10,
    color: '#222222',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  tipText: {
    color: '#5E5E5E',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    lineHeight: 16,
    marginLeft: 28,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContainer: {
    height: DEVICE_HEIGHT * 0.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  dragLine: {
    width: 50,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
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
    color: '#222222',
  },

  closeBtn: {
    fontSize: 22,
  },

  imageUploadBox: {
    height: 143,
    width: 163,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0170F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#F1F7FF',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  uploadImageText: {
    marginTop: 10,
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#222222',
  },

  halfInput: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },

  descriptionInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    textAlignVertical: 'top',
  },

  dropdownPlaceholder: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#5E5E5E',
  },

  dropdownText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#5E5E5E',
  },

  dropdownItemText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#5E5E5E',
  },

  submitBtn: {
    height: 51,
    backgroundColor: '#0170F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    color: '#ffffff',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },
});
