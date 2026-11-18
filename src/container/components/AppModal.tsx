import React from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  showClose?: React.ReactNode;
};

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  containerStyle,
  children,
  showClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, containerStyle]} onPress={() => {}}>
          <View style={styles.grabber} />
          <View style={styles.headerCon}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {showClose && showClose}
          </View>
          <View style={styles.content}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default React.memo(AppModal);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: '85%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E6E6E6',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  content: {
    paddingBottom: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
