import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function YesScreen({ route }) {
  // Today_DetailScreen から渡されたパラメータを取得
  const { month, day, dayOfWeek, yarukoto, who } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`${month}月${day}日${dayOfWeek}のやること`}</Text>
      <Text style={styles.detailText}>{`${yarukoto}`}</Text>
      <Text style={styles.footerText}>{`誰がしましたか`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bba8e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 18,
  },
});
