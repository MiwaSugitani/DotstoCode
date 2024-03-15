import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function Other_TodayScreen() {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>今日以外のタスク</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});