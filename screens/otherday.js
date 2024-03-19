import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function OtherdayScreen({route}) {
    const { selectedDate } = route.params; // パラメータを取得
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{selectedDate}のタスク</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
