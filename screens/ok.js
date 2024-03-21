import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OKScreen({ route }) {
  //前画面から値の引き継ぎ
  const { month, day, dayOfWeek, yarukoto, who } = route.params;

  // 背景色を決定する関数
  const getBackgroundColor = () => {
    if (who === 'おばあちゃん') {
      return '#ff8f9f';
    }
    if (who === 'おじいちゃん') {
      return '#76dae3';
    }
  // その他の場合、デフォルトの背景色を返す
    return 'transparent';
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { marginBottom: 10 }]}>{`${month}月${day}日${dayOfWeek}\nのやること`}</Text>
      <Text style={styles.detailText}>{`${yarukoto}は`}</Text>
      <View style={[styles.footerContainer, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.footerText}>{`${who}が\nしました！`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  largeText: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 10,
  },
  footerContainer: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  footerText: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
  },
});