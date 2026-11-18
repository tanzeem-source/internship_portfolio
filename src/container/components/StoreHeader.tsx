import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import PointerIcon from '../../assets/Svg/pointer.svg';
import SearchIcon from '../../assets/Svg/search.svg';
import MoreIcon from '../../assets/Svg/more.svg';

import { fontScale } from '../utilities/Utils';
import { FONTS } from '../../constants/common.constants';

type Props = {
  storeName: string;
  isOnline: boolean;
  closingTime: string;
  searchText: string;
  setSearchText: (text: string) => void;
};

export default function StoreHeader({
  storeName,
  isOnline,
  closingTime,
  searchText,
  setSearchText,
}: Props) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <View style={styles.storeRow}>
            <PointerIcon width={20} height={20} />
            <Text style={styles.storeName}>{storeName}</Text>
          </View>

          <Text style={styles.status}>
            <Text
              style={[
                styles.online,
                { color: isOnline ? '#00F144' : '#FF3B30' },
              ]}
            >
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            {'  '}•{'  '}
            Closes at {closingTime}
          </Text>
        </View>

        <View style={styles.iconsRow}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <SearchIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreBtn}>
            <MoreIcon width={39} height={39} />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
    <TextInput
      placeholder="Search items..."
      value={searchText}
      onChangeText={
        setSearchText
      }
      style={
        styles.searchInput
      }
    />
  )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0170F0',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  storeName: {
    marginLeft: 6,
    color: '#fff',
    fontSize: 20 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_BOLD,
  },

  searchInput: {
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginTop: 12,
  paddingHorizontal: 14,
  height: 45,
  color: '#222',
},

  status: {
    color: '#FFFFFF',
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    marginTop: 2,
    marginLeft: 10,
  },

  online: {
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
  },

  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreBtn: {
    marginLeft: 12,
  },
});
