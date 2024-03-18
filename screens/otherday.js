import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function OtherdayScreen(route) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{route.params.selectedDate}のタスク</Text>
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
