import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ScreenWrapper from '../../components/ScreenWrapper';
import CommonHeader from '../../components/CommonHeader';

import { reviews } from '../../../MockData/reviews';
import { fontScale } from '../../utilities/Utils';
import { FONTS } from '../../../constants/common.constants';

import StarIcon from '../../../assets/svgComp/star.svg';
import SortIcon from '../../../assets/svgComp/sort.svg';

const AllReviews = () => {
  const [selectedRating, setSelectedRating] = useState('All');

  const [showFilter, setShowFilter] = useState(false);

  return (
    <ScreenWrapper style={styles.container}>
      <CommonHeader title="Ratings & Reviews" />

      {/* Sort Button */}
      <View style={styles.sortWrapper}>
        <Text style={styles.showingText}>Showing all reviews</Text>

        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setShowFilter(!showFilter)}
        >
          <SortIcon width={16} height={16} />

          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {showFilter && (
        <View style={styles.filterBox}>
          {['All', '5', '4', '3', '2', '1'].map(rating => (
            <TouchableOpacity
              key={rating}
              style={styles.filterItem}
              onPress={() => {
                setSelectedRating(rating);
                setShowFilter(false);
              }}
            >
              <Text>{rating === 'All' ? 'All Reviews' : `${rating} Star`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {reviews
          .filter(
            item =>
              selectedRating === 'All' ||
              item.rating === Number(selectedRating),
          )
          .map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.nameRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>

                <Text style={styles.name}>{item.name}</Text>
              </View>

              <View style={styles.ratingRow}>
                {[...Array(item.rating)].map((_, index) => (
                  <StarIcon key={index} width={16} height={16} />
                ))}

                <Text style={styles.ratingText}>
                  {item.rating}
                  .0
                </Text>
              </View>

              <Text style={styles.review}>{item.review}</Text>
            </View>
          ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AllReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

 sortWrapper: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginTop: 12,
},

showingText: {
  fontSize: 12 / fontScale,
  fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  color: '#7A7A7A',
},

  sortBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  sortText: {
    color: '#000000',
    fontSize: 14 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0170F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
  },

  name: {
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    fontSize: 14 / fontScale,
    color: '#494747',
  },

  review: {
    color: '#494747',
    lineHeight: 20,
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },

  ratingRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 10,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 10 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#222222',
  },

  filterBox: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },

  filterItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
