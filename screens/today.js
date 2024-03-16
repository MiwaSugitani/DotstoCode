import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>今日のタスク</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
