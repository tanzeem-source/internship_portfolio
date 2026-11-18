import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import useThemeColors from '../../container/hooks/useThemeColors';

const ArrowRight = (props: SvgProps) => {
  const { theme } = useThemeColors();
  const color = theme.colors.primary;
  return (
    <Svg width={13} height={11} viewBox="0 0 13 11" fill="none" {...props}>
      <Path
        d="M0.5 5.17533L12.3593 5.16667M7.84133 9.83333L12.5 5.16667L7.84133 0.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowRight;
