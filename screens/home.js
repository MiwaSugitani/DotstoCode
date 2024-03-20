import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function HomeScreen({ navigation }) {
  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' }); // 曜日を取得

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          <Text style={[styles.largeText, { fontSize: 40, textAlign: 'center'}]}>
            今日は{'\n'}
            {month}月{day}日{dayOfWeek}です
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('今日のやること')}
      >
        <Text style={styles.buttonText}>今日のやること</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('今日以外のやること')}
      >
        <Text style={styles.buttonText}>今日以外のやること</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('やることの編集')}
      >
        <Text style={styles.buttonText}>やることの編集</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    width: 350,
    alignItems: 'center', // ボタン内の要素を中央に配置
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: 'pink',
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
});
