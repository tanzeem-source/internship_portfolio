import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

// Only re-render if children, style, or safe area insets change
type ScreenWrapperProps = {
  children?: React.ReactNode;
  style?: any;
  [key: string]: any;
};

const ScreenWrapper = React.memo(
  ({ children, style, ...props }: ScreenWrapperProps) => {
    const insets = useSafeAreaInsets();

    // Memoize the combined style so the reference is stable unless dependencies change
    const containerStyle = useMemo(
    () => [
      styles.container,
      { paddingTop: insets.top, paddingBottom: insets.bottom },
      style,
    ],
    [style, insets.top, insets.bottom],
  );

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
});

export default ScreenWrapper;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));