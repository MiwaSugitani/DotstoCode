import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function OtherdayScreen({route}) {
    const selectedDate = route.params.selectedDate; // パラメータを取得

    const year = selectedDate.slice(0, 4);
    const date = selectedDate.slice(5, 7);
    const day = selectedDate.slice(8, 10);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{year}年{date}月{day}日のタスク</Text>
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
