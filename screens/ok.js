import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OKScreen({ route }) {
  //前画面から値の引き継ぎ
  const { month, day, dayOfWeek, yarukoto, who } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`${month}月${day}日${dayOfWeek}のやること`}</Text>
      <Text style={styles.detailText}>{`${yarukoto}は`}</Text>
      <Text style={styles.footerText}>{`${who}がしました！`}</Text>
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
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 10,
    width: 350,
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
