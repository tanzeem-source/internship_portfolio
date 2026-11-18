import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';

import BigStarIcon from '../../assets/svgComp/bigstar.svg';

const ReviewSummaryCard = ({ reviews, navigation }) => {
  const totalReviews = reviews.length;

  const averageRating = (
    reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews
  ).toFixed(1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ratings & Reviews</Text>

      <View style={styles.row}>
        {/* Rating */}
        <View>
          <Text style={styles.rating}>
            <BigStarIcon width={27} height={27} /> {averageRating}
          </Text>

          <Text style={styles.subText}>{totalReviews} Reviews</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AllReviews')}
        >
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewSummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
  },

  title: {
    fontSize: 16 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_SEMIBOLD,
    color: '#333333',
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rating: {
    fontSize: 28 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_MEDIUM,
    color: '#000000',
  },

  subText: {
    fontSize: 12 / fontScale,
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
    color: '#595959',
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 18,
  },

  button: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },

  buttonText: {
    fontSize: 16 / fontScale,
    color: '#222222',
    fontFamily: FONTS.SF_PRO_ROUNDED_REGULAR,
  },
});
