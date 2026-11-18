import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FONTS } from '../../constants/common.constants';
import { fontScale } from '../utilities/Utils';

type AppTextProps = React.ComponentProps<typeof Text> & {
  children?: React.ReactNode;
  style?: any;
};

const AppText = React.forwardRef<Text, AppTextProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Text
        allowFontScaling={false}
        style={[defaultStyles.text, style].flat()}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

export default React.memo(AppText);

// Use unistyles StyleSheet for proper theme integration
const defaultStyles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    verticalAlign: 'middle',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: FONTS.SF_PRO_ROUNDED,
    fontSize: 14 / fontScale,
    letterSpacing: 0.5,
  },
});
