import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OrderType {
  id: string;
}

interface Props {
  order: OrderType;
  onView: (order: OrderType) => void;
  onMarkReady: (id: string) => void;
}

const PreparingContent: React.FC<Props> = ({
  order,
  onView,
  onMarkReady,
}) => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={styles.secondaryBtn1}
        onPress={() => onView(order)}
      >
        <Text style={styles.viewText}>View Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn2}
        onPress={() => onMarkReady(order.id)}
      >
        <Text style={styles.readyText}>Mark Ready</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreparingContent;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  secondaryBtn1: {
    width: 151,
    height: 39,
    borderWidth: 1,
    borderColor: '#0170F0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  secondaryBtn2: {
    width: 151,
    height: 39,
    backgroundColor: '#0170F0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewText: {
    color: '#222222',
  },

  readyText: {
    color: '#fff',
  },
});